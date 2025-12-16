import { CONFIG } from 'src/config-global';

import { ComingSoonView } from 'src/sections/coming-soon/view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | به زودی` };

export default function Page() {
  return <ComingSoonView />;
}
