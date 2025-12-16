import { CONFIG } from 'src/config-global';

import { View500 } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | 500 خطای داخلی سرور!` };

export default function Page() {
  return <View500 />;
}
