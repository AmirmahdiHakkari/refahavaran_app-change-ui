'use client';

import Box from '@mui/material/Box';
import { ButtonBase, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import {
  MOCK_TRANSACTIONS,
  _bankingCreditCard,
  //  _ecommerceLatestProducts
} from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { CreditCurrentBalance } from '../credit-current-balance';
import { CreditLatestTransaction } from '../credit-latest-transaction';

// ----------------------------------------------------------------------

export function OverviewCreditView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} sx={{ '--Grid-columns': 'unset' }}>
        <Grid xs={12} md={7} lg={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CreditCurrentBalance list={_bankingCreditCard} />

            <Grid
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: '1fr 1fr',
                px: 0,
                // mt: 1,
                mb: 3,
              }}
            >
              <ButtonBase
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow:
                    '0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)',
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  px: 1,
                  py: 2,
                }}
              >
                <Iconify icon="material-symbols:vpn-key-outline-rounded" width={24} />
                <Typography
                  variant="subtitle2"
                  sx={{ lineHeight: 1.2, textAlign: 'center', fontWeight: 500 }}
                >
                  دریافت رمز یکبار مصرف
                </Typography>
              </ButtonBase>
              <ButtonBase
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow:
                    '0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)',
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  px: 1,
                  py: 2,
                }}
              >
                <Iconify icon="mdi:credit-card-outline" width={24} />
                <Typography
                  variant="subtitle2"
                  sx={{ lineHeight: 1.2, textAlign: 'center', fontWeight: 500 }}
                >
                  مدیریت کیف‌پول‌ها
                </Typography>
              </ButtonBase>
            </Grid>

            <CreditLatestTransaction title="تراکنش‌های اخیر" list={MOCK_TRANSACTIONS} />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
