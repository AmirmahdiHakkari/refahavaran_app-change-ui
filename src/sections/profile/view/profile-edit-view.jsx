'use client';

import { useRouter } from 'next/navigation';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProfileNewEditForm } from '../profile-new-edit-form';

// ----------------------------------------------------------------------

export function ProfileEditView({ user: currentUser }) {
  const router = useRouter();

  return (
    <DashboardContent>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 5,
        }}
      >
        <CustomBreadcrumbs heading="ویرایش اطلاعات کاربری" links={[]} />

        {/* <Button variant="text" onClick={() => router.push(paths.dashboard.profile.view)}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </Button> */}
      </Stack>

      <ProfileNewEditForm currentUser={currentUser} />
    </DashboardContent>
  );
}
