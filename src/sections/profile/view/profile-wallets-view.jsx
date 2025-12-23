'use client';

import { useRouter } from 'next/navigation';

import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _bankingCreditCard } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { ProfileWallets } from '../profile-wallets';

// ----------------------------------------------------------------------

export function ProfileWalletsView() {
  const router = useRouter();
  return (
    <DashboardContent maxWidth="xl">
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 5,
        }}
      >
        <Typography variant="h4">کیف‌‌پول‌های من</Typography>

        {/* <Button variant="text" onClick={() => router.push(paths.dashboard.profile.view)}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </Button> */}
      </Stack>

      <Grid container spacing={3}>
        <Grid xs={12}>
          <ProfileWallets list={_bankingCreditCard} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
