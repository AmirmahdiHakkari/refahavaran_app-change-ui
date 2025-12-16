import { CONFIG } from 'src/config-global';

import { InstallmentsView } from 'src/sections/installments/view/installments-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | اقساط` };

export default function Page() {
  return <InstallmentsView />;
}
