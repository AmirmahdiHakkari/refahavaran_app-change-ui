import { CONFIG } from 'src/config-global';

import { ProfileView } from 'src/sections/profile/view/profile-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | پروفایل` };

export default function Page() {
  return <ProfileView />;
}
