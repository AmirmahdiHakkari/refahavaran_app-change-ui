'use client';

import { useRouter } from 'next/navigation';

import Card from '@mui/material/Card';
import { Stack, Button, Divider } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { SignOutButton } from 'src/layouts/components/sign-out-button';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProfileCover } from '../profile-cover';
import { ProfileSupport } from '../profile-Support';
import { ProfileManagement } from '../profile-management';

// ----------------------------------------------------------------------

export function ProfileView() {
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
        <CustomBreadcrumbs heading="حساب من" links={[]} />

        {/* <Button variant="text" onClick={() => router.push(paths.dashboard.credit)}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </Button> */}
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
