import { CONFIG } from 'src/config-global';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | 404 صفحه مورد نظر یافت نشد` };

export default function Page() {
  return <NotFoundView />;
}
