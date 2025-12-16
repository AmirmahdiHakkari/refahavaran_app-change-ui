import { CONFIG } from 'src/config-global';

import { StoresView } from 'src/sections/stores/view/store-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | فروشگاه‌ها` };

export default function Page() {
  return <StoresView />;
}
