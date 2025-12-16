// identify/otp/page.jsx

import { CONFIG } from 'src/config-global';

import { IdentifyOtpView } from 'src/sections/identify/view/identify-otp-view';

// ----------------------------------------------------------------------

export const metadata = { title: `کد پویا | ${CONFIG.site.name}` };

export default function Page() {
  return <IdentifyOtpView />;
}
