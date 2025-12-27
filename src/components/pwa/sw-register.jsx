'use client';

import { useEffect } from 'react';

/**
 * Minimal Service Worker registration for PWA.
 *
 * Notes:
 * - We register under the configured Next.js basePath (if any).
 * - We keep this lightweight to avoid impacting app boot.
 */
export function SWRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    // In dev, SW can be more annoying than helpful. Enable in prod by default.
    if (process.env.NODE_ENV !== 'production') return;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    const swUrl = `${basePath}/sw.js`;
    const scope = `${basePath}/`;

    navigator.serviceWorker
      .register(swUrl, { scope })
      // eslint-disable-next-line no-console
      .catch((err) => console.warn('Service Worker registration failed:', err));
  }, []);

  return null;
}
