'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { DashboardContent } from 'src/layouts/dashboard';
import { MOCK_TRANSACTIONS, _bankingCreditCard } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { OtpDrawer } from 'src/components/otp-drawer/otp-drawer';

import { CreditCurrentBalance } from '../credit-current-balance';
import { CreditLatestTransaction } from '../credit-latest-transaction';

// ----------------------------------------------------------------------

const actionBtnSx = {
  bgcolor: 'background.paper',
  boxShadow: '0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)',
  borderRadius: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  px: 1,
  py: 2,
};

// ----------------------------------------------------------------------

function generateOtp4() {
  return String(Math.floor(120 + Math.random() * 9000));
}

export function OverviewCreditView() {
  // Drawer state
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('----');

  const TOTAL_SECONDS = 120;
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);

  const openOtpDrawer = useCallback(() => {
    setOtpCode(generateOtp4());
    setRemaining(TOTAL_SECONDS);
    setOtpOpen(true);
  }, []);

  // Countdown
  useEffect(() => {
    if (!otpOpen) return undefined;

    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [otpOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(otpCode);

      toast.info('رمز یکبار مصرف کپی شد');
    } catch (e) {
      // fallback خیلی ساده
      try {
        const ta = document.createElement('textarea');
        ta.value = otpCode;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (err) {
        console.error(err);
      }
    }
  };

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
                mb: 3,
              }}
            >
              <ButtonBase sx={actionBtnSx} onClick={openOtpDrawer}>
                <Iconify icon="material-symbols:vpn-key-outline-rounded" width={24} />
                <Typography
                  variant="subtitle2"
                  sx={{ lineHeight: 1.2, textAlign: 'center', fontWeight: 500 }}
                >
                  دریافت رمز یکبار مصرف
                </Typography>
              </ButtonBase>

              <ButtonBase sx={actionBtnSx}>
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

      <OtpDrawer
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onOpen={() => setOtpOpen(true)}
        otpCode={otpCode}
        remaining={remaining}
        totalSeconds={TOTAL_SECONDS}
        cardTitle="رمز یکبار مصرف"
        cardNumber="6219 8618 7195 0597"
        onCopy={handleCopy}
      />
    </DashboardContent>
  );
}
