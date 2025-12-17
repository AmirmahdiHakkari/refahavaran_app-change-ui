'use client';

import { useBoolean } from 'src/hooks/use-boolean';

import { Main, Content } from './main';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export function AuthSplitLayout({ sx, section, children }) {
  const mobileNavOpen = useBoolean();

  const layoutQuery = 'md';

  return (
    <LayoutSection
      headerSection={null
        /** **************************************
         * Header
         *************************************** */
        // <HeaderBase
        //   disableElevation
        //   layoutQuery={layoutQuery}
        //   onOpenNav={mobileNavOpen.onTrue}
        //   slotsDisplay={{
        //     signIn: false,
        //     account: false,
        //     purchase: false,
        //     contacts: false,
        //     workspaces: false,
        //     localization: false,
        //     notifications: false,
        //   }}
        //   slots={{}}
        //   slotProps={{ container: { maxWidth: false } }}
        //   sx={{ position: { [layoutQuery]: 'fixed' } }}
        // />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      sx={sx}
      cssVars={{
        '--layout-auth-content-width': '420px',
      }}
    >
      <Main layoutQuery={layoutQuery}>
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  );
}
