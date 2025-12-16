// identify/status/page.jsx
import { CONFIG } from 'src/config-global';

import { IdentifyStatusView } from 'src/sections/identify/view/identify-status-view';

// ----------------------------------------------------------------------

export const metadata = { title: `وضعیت | ${CONFIG.site.name}` };

export default function Page() {
  return <IdentifyStatusView />;
}
