'use client';

import Card from '@mui/material/Card';
import { Stack, Divider } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { SignOutButton } from 'src/layouts/components/sign-out-button';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProfileCover } from '../profile-cover';
import { ProfileSupport } from '../profile-Support';
import { ProfileManagement } from '../profile-management';

// ----------------------------------------------------------------------

export function ProfileView() {
  return (
    <DashboardContent>
      <Stack
        sx={{
          mb: 3,
        }}
      >
        <CustomBreadcrumbs heading="حساب من" links={[]} />
      </Stack>

      <Card sx={{ mb: 3, height: 250 }}>
        <ProfileCover />
      </Card>

      <ProfileManagement />

      <ProfileSupport />

      <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

      <SignOutButton sx={{ height: 60 }} />
    </DashboardContent>
  );
}
