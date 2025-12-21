'use client';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';

import { createTheme } from './create-theme';
import { RTL } from './with-settings/right-to-left';
import { schemeConfig } from './color-scheme-script';

// ----------------------------------------------------------------------

export function ThemeProvider({ children }) {
  const { currentLang } = useTranslate();

  const settings = useSettingsContext();

  const theme = createTheme(currentLang?.systemValue, settings);

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <CssVarsProvider
        theme={theme}
        defaultMode={schemeConfig.defaultMode}
        modeStorageKey={schemeConfig.modeStorageKey}
      >
        <CssBaseline />
        <GlobalStyles
          styles={{
            '#pwa-shell': {
              width: '450px',
              maxWidth: '450px',
              minWidth: '450px',
              marginLeft: 'auto',
              marginRight: 'auto',
              minHeight: '100vh',
              position: 'relative',
            },
            '@supports (height: 100dvh)': {
              '#pwa-shell': {
                minHeight: '100dvh',
              },
            },
          }}
        />
        <RTL direction={settings.direction}>
          <div id="pwa-shell">{children}</div>
        </RTL>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
}
