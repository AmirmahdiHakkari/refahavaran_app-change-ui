import { CONFIG } from 'src/config-global';

import { StoresSearchView } from 'src/sections/stores/view/stores-search-view';

export const metadata = { title: `${CONFIG.site.name} | جست‌وجو` };

export default function Page() {
  return <StoresSearchView />;
}
