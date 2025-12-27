// Web App Manifest route
// Next.js file convention: app/manifest.js
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest

export default function manifest() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const scope = `${basePath}/`;

  // You can override these via env vars without code changes.
  const name = process.env.NEXT_PUBLIC_APP_NAME ?? 'رفاه‌آوران';
  const shortName = process.env.NEXT_PUBLIC_APP_SHORT_NAME ?? 'رفاه';
  const description =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? 'سامانه رفاه‌آوران (Next.js + MUI)';

  const themeColor = process.env.NEXT_PUBLIC_THEME_COLOR ?? '#00A76F';
  const backgroundColor = process.env.NEXT_PUBLIC_BACKGROUND_COLOR ?? '#FFFFFF';

  return {
    name,
    short_name: shortName,
    description,
    // Trailing slash is enabled in next.config.mjs.
    start_url: scope,
    scope,
    display: 'standalone',
    orientation: 'portrait',
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      { src: `${basePath}/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${basePath}/icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
      {
        src: `${basePath}/icons/icon-192-maskable.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${basePath}/icons/icon-512-maskable.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
