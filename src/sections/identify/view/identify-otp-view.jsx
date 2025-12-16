'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Button, Typography } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form, Field } from 'src/components/hook-form';

// --- utils ---
const faDigits = '۰۱۲۳۴۵۶۷۸۹';
const toEn = (s = '') => s.replace(/[\u06F0-\u06F9]/g, (d) => String(faDigits.indexOf(d)));

const maskPhone = (p) => {
  if (!p) return '';
  const s = String(p);
  if (s.length < 7) return s;
  return `${s.slice(-4)} ••• ${s.slice(0, 4)}`;
};

const fmtMMSS = (total) => {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

// --- schema ---
const OtpSchema = zod.object({
  code: zod
    .string()
    .transform((v) => toEn(v))
    .refine((v) => /^\d{6}$/.test(v), { message: 'کد باید ۶ رقم باشد' }),
});

export function IdentifyOtpView() {
  const router = useRouter();
  const sp = useSearchParams();

  const phone = sp.get('phone') || '';
  const merchant = sp.get('merchant') || 'نارون';
  const amount = sp.get('amount') || '100000';
  const ref = sp.get('ref') || 'NV-984213';
  const start = sp.get('start') || '2025-11-08';

  const [locked, setLocked] = useState(false);

  // شمارش معکوس ۲ دقیقه‌ای برای «ارسال مجدد کد»
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [resending, setResending] = useState(false);
  const counting = secondsLeft > 0;

  useEffect(() => {
    if (secondsLeft <= 0) {
      return undefined;
    }
    const id = setInterval(() => {
      setSecondsLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [secondsLeft]);

  const methods = useForm({
    resolver: zodResolver(OtpSchema),
    defaultValues: { code: '' },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (locked) return;
    setLocked(true);

    try {
      // TODO: verify OTP واقعی با data.code
      const q = new URLSearchParams({
        result: 'success',
        merchant,
        amount,
        ref,
        start,
      });
      router.push(`/identify/status?${q.toString()}`);
    } catch (err) {
      setLocked(false);
      setError('code', { message: 'اشکالی رخ داد. دوباره تلاش کنید.' });
    }
  });

  const handleResend = async () => {
    if (counting) return;
    try {
      setResending(true);
      // TODO: API ارسال مجدد OTP با phone و ...
      setSecondsLeft(120); // شروع دوباره‌ی تایمر
    } catch (e) {
      console.error(e);
    } finally {
      setResending(false);
    }
  };

  return (
    <DashboardContent>
      <Box
        sx={{
          minHeight: 320,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack spacing={1} sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h3">خرید از فروشگاه {merchant}</Typography>
          <Typography variant="h4" color="text.primary">
            به مبلغ {fCurrency(Number(amount))}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 1, gap: 2, flexWrap: 'nowrap' }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            کد تأیید به شماره‌ی{' '}
            <Box component="strong" sx={{ fontWeight: 700, display: 'inline' }}>
              {maskPhone(phone)}
            </Box>{' '}
            ارسال شد.
          </Typography>

          <Button
            type="button"
            variant="text"
            onClick={() => router.back()}
            sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            تغییر شماره
          </Button>
        </Stack>

        <Form methods={methods} onSubmit={onSubmit}>
          <Stack sx={{ direction: 'rtl' }}>
            <Field.Code name="code" />
          </Stack>

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="button"
            variant="outlined"
            onClick={handleResend}
            loading={resending}
            disabled={counting || resending}
            sx={{ my: 2 }}
          >
            {counting ? `ارسال مجدد کد (${fmtMMSS(secondsLeft)})` : 'ارسال مجدد کد'}
          </LoadingButton>

          {/* دکمهٔ اصلی */}
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || locked}
            loadingIndicator="در حال بررسی..."
          >
            تأیید و ادامه
          </LoadingButton>
        </Form>
      </Box>
    </DashboardContent>
  );
}
