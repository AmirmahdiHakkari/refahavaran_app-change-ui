import { CONFIG } from 'src/config-global';

import { JwtSignInView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | ورود` };

export default function Page() {
  return <JwtSignInView />;
}
