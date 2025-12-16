import { CONFIG } from 'src/config-global';

import { IdentifyOtpView } from 'src/sections/identify/view/identify-otp-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | کد پویا` };

export default function Page() {
  return <IdentifyOtpView />;
}
