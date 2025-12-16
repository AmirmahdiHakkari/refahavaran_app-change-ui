// identify/login/page.jsx

import { CONFIG } from 'src/config-global';

import { IdentifyLoginView } from 'src/sections/identify/view/identify-login-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ورود | ${CONFIG.site.name}` };

export default function Page() {
  return <IdentifyLoginView />;
}
