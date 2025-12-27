/*
 * Minimal Service Worker for Next.js PWA (no Workbox).
 *
 * Goals:
 * - Provide an offline fallback for navigations.
 * - Cache static assets (Next.js build assets, fonts, images) for speed and resilience.
 *
 * Notes:
 * - This SW intentionally does NOT cache HTML documents aggressively to avoid stale pages.
 * - Make sure sw.js is served with Cache-Control: no-cache (configured in next.config.mjs).
 */

const CACHE_VERSION = 'v1';

const CACHE_NAMES = {
  precache: `precache-${CACHE_VERSION}`,
  runtime: `runtime-${CACHE_VERSION}`,
};

/**
 * Derive basePath from the SW registration scope.
 * - scope('/') -> basePath ''
 * - scope('/foo/') -> basePath '/foo'
 */
function getBasePath() {
  try {
    const scopePath = new URL(self.registration.scope).pathname; // always ends with '/'
    const trimmed = scopePath.endsWith('/') ? scopePath.slice(0, -1) : scopePath;
    return trimmed === '/' ? '' : trimmed;
  } catch {
    return '';
  }
}

function isCacheableRequest(request) {
  return request.method === 'GET' && request.url.startsWith(self.location.origin);
}

function isNextStatic(pathname) {
  return pathname.includes('/_next/static/');
}

function isPublicAsset(pathname) {
  return (
    pathname.includes('/assets/') ||
    pathname.includes('/fonts/') ||
    pathname.includes('/icons/') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.ttf')
  );
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAMES.runtime);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAMES.runtime);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || (await fetchPromise) || new Response('', { status: 504 });
}

self.addEventListener('install', (event) => {
  const basePath = getBasePath();
  const offlineUrl = `${basePath}/offline.html`;
  const manifestUrl = `${basePath}/manifest.webmanifest`;

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAMES.precache);
      await cache.addAll([
        offlineUrl,
        manifestUrl,
        `${basePath}/favicon.ico`,
        `${basePath}/icons/icon-192.png`,
        `${basePath}/icons/icon-512.png`,
        `${basePath}/icons/icon-192-maskable.png`,
        `${basePath}/icons/icon-512-maskable.png`,
        `${basePath}/icons/apple-touch-icon.png`,
      ]);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !Object.values(CACHE_NAMES).includes(key))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (!isCacheableRequest(request)) return;

  const url = new URL(request.url);
  const basePath = getBasePath();
  const offlineUrl = `${basePath}/offline.html`;

  // 1) Navigations: Network-first + offline fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(CACHE_NAMES.precache);
          const cached = await cache.match(offlineUrl);
          return cached || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }

  // 2) Next.js build assets: cache-first.
  if (isNextStatic(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 3) Public assets (images/fonts/icons): stale-while-revalidate.
  if (isPublicAsset(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
