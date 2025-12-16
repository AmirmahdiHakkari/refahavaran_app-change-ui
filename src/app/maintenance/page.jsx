import { CONFIG } from 'src/config-global';

import { MaintenanceView } from 'src/sections/maintenance/view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | تعمیر ` };

export default function Page() {
  return <MaintenanceView />;
}
