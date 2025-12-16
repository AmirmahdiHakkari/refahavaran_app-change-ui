import { CONFIG } from 'src/config-global';

import { OverviewCreditView } from 'src/sections/overview/credit/view/overview-credit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | اعتبار` };

export default function Page() {
  return <OverviewCreditView />;
}
