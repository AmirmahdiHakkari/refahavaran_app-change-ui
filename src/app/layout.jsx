import 'src/global.css';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';
import { getInitColorSchemeScript } from 'src/theme/color-scheme-script';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { detectSettings } from 'src/components/settings/server';
import { defaultSettings, SettingsProvider } from 'src/components/settings';

// import { CheckoutProvider } from 'src/sections/checkout/context';

import { SWRegister } from 'src/components/pwa/sw-register';

import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

const AuthProvider = JwtAuthProvider;

export const viewport = {
  width: 450,
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  applicationName: CONFIG.site.name,
  manifest: `${CONFIG.site.basePath}/manifest.webmanifest`,
  appleWebApp: {
    capable: true,
    title: CONFIG.site.name,
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: `${CONFIG.site.basePath}/favicon.ico` },
      { url: `${CONFIG.site.basePath}/icons/icon-192.png`, sizes: '192x192' },
    ],
    apple: [{ url: `${CONFIG.site.basePath}/icons/apple-touch-icon.png`, sizes: '180x180' }],
  },
};

export default async function RootLayout({ children }) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const settings = CONFIG.isStaticExport ? defaultSettings : await detectSettings();

  return (
    <html lang={lang ?? 'en'} suppressHydrationWarning>
      <body>
        {getInitColorSchemeScript}

        <SWRegister />

        <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
          <LocalizationProvider>
            <AuthProvider>
              <SettingsProvider
                settings={settings}
                caches={CONFIG.isStaticExport ? 'localStorage' : 'cookie'}
              >
                <ThemeProvider>
                  <MotionLazy>
                    <ProgressBar />
                    <Snackbar />
                    {children}
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
