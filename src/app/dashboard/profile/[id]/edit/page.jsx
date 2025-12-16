import { CONFIG } from 'src/config-global';
import { _userList } from 'src/_mock/_user';

import { ProfileEditView } from 'src/sections/profile/view/profile-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `${CONFIG.site.name} | ویرایش اطلاعات کاربری` };

export default function Page({ params }) {
  const { id } = params;

  const currentUser = _userList.find((user) => user.id === id);

  return <ProfileEditView user={currentUser} />;
}
