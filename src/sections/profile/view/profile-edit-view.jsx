'use client';

import { useRouter } from 'next/navigation';

import { Stack } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProfileNewEditForm } from '../profile-new-edit-form';

// ----------------------------------------------------------------------

export function ProfileEditView({ user: currentUser }) {
  const router = useRouter();

  return (
    <DashboardContent>
      <Stack
        sx={{
          width: 1,
          mb: 3,
        }}
      >
        <CustomBreadcrumbs heading="ویرایش اطلاعات کاربری" links={[]} />
      </Stack>

      <ProfileNewEditForm currentUser={currentUser} />
    </DashboardContent>
  );
}
