import { CONFIG } from 'src/config-global';

import { IdentifyStatusView } from 'src/sections/identify/view/identify-status-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | وضعیت` };

export default function Page() {
  return <IdentifyStatusView />;
}
