import { CONFIG } from 'src/config-global';

import { ProfileTransactionsView } from 'src/sections/profile/view/profile-transactions-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | تراکنش‌ها` };

export default function Page() {
  return <ProfileTransactionsView />;
}
