'use client';

import { Main } from './main';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export function MainLayout({ sx, data, children }) {
  return (
    <LayoutSection sx={sx}>
      <Main>{children}</Main>
    </LayoutSection>
  );
}
