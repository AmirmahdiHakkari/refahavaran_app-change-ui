'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form, Field } from 'src/components/hook-form';

export const SignInSchema = zod.object({
  phone: zod
    .string()
    .min(11, { message: 'شماره باید ۱۱ رقم باشد' })
    .max(11, { message: 'شماره باید ۱۱ رقم باشد' })
    .regex(/^[0-9\u06F0-\u06F9]+$/, { message: 'فقط عدد مجاز است' }),
});

export function IdentifyLoginView() {
  const router = useRouter();
  const sp = useSearchParams();

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { phone: '' },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [locked, setLocked] = useState(false);

  const amount = sp.get('amount') || '100000';
  const merchant = sp.get('merchant') || 'نارون';
  const ref = sp.get('ref') || 'NV-984213';
  const start = sp.get('start') || '2025-11-08';

  const onSubmit = handleSubmit(async (data) => {
    if (locked) return;
    setLocked(true);

    const cleaned = String(data.phone)
      .replace(/[\s-]/g, '')
      .replace(/[\u06F0-\u06F9]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));

    const q = new URLSearchParams(sp.toString());
    q.set('phone', cleaned);
    q.set('merchant', merchant);
    q.set('amount', amount);
    q.set('ref', ref);
    q.set('start', start);

    try {
      router.push(`/identify/otp?${q.toString()}`);
    } catch (e) {
      setLocked(false);
      console.error(e);
    }
  });

  return (
    <DashboardContent>
      <Box
        sx={{
          height: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <Typography variant="h3">خرید از فروشگاه {merchant}</Typography>
          <Typography variant="h4" color="text.primary">
            به مبلغ {fCurrency(Number(amount))}
          </Typography>
        </Stack>

        <Form methods={methods} onSubmit={onSubmit}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            شماره‌ای که با آن در رفاه‌آوران ثبت‌نام کرده‌اید را وارد کنید
          </Typography>
          <Field.Text
            name="phone"
            label="شماره موبایل"
            fullWidth
            autoFocus
            inputProps={{ maxLength: 11 }}
            sx={{ mb: 3 }}
          />

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || locked}
            loadingIndicator="درحال ورود..."
          >
            ادامه فرایند
          </LoadingButton>
        </Form>
      </Box>
    </DashboardContent>
  );
}
