import { CONFIG } from 'src/config-global';

import { View403 } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | ۴۰۳ ممنوع!` };

export default function Page() {
  return <View403 />;
}
