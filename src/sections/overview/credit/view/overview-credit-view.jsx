'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { _bankingCreditCard, _ecommerceLatestProducts } from 'src/_mock';

import { CreditCurrentBalance } from '../credit-current-balance';
import { CreditLatestTransaction } from '../credit-latest-transaction';

// ----------------------------------------------------------------------

export function OverviewCreditView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} sx={{ '--Grid-columns': 'unset' }}>
        <Grid xs={12} md={7} lg={8}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <CreditCurrentBalance list={_bankingCreditCard} />

            <CreditLatestTransaction title="تراکنش‌های اخیر" list={_ecommerceLatestProducts} />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
