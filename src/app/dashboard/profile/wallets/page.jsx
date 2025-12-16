import { CONFIG } from 'src/config-global';

import { ProfileWalletsView } from 'src/sections/profile/view/profile-wallets-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | کیف‌‌پول‌ها` };

export default function Page() {
  return <ProfileWalletsView />;
}
