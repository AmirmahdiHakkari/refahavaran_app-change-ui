import { CONFIG } from 'src/config-global';

import { IdentifyLoginView } from 'src/sections/identify/view/identify-login-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | ورود` };

export default function Page() {
  return <IdentifyLoginView />;
}
