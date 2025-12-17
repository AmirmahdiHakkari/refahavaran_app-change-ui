'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, alpha, Paper } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { signInWithPassword } from 'src/auth/context/jwt';

//----------------------------------------------------------------------
export const SignInSchema = zod.object({
  phone: zod
    .string()
    .min(11, { message: 'Email is required!' })
    .max(11, { message: 'Email is required!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const password = useBoolean();

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const slides = useMemo(
    () => [
      {
        key: 's1',
        bg: ['#6E79D6', '#5966CE'],
        title: 'خدمات مالی، هوشمند',
        subtitle: 'از کارت به کارت، خرید شارژ و اینترنت، تا پرداخت قبض رو\nسریع و آسان انجام بده.',
        imageSrc: '',
      },
      {
        key: 's2',
        bg: ['#43C07D', '#2FA462'],
        title: 'سرمایه‌گذاری، بدون ریسک',
        subtitle: 'بدون ریسک در صندوق‌های درآمد ثابت سرمایه‌گذاری و\nسود کن.',
        imageSrc: '',
      },
      {
        key: 's3',
        bg: ['#3E89E6', '#2F6FCA'],
        title: 'خدمات بیمه، اقساطی',
        subtitle: 'آنلاین مقایسه کن و از بین ده‌ها بیمه‌گذار، نقدی یا\nاقساطی بیمه بخر.',
        imageSrc: '',
      },
      {
        key: 's4',
        bg: ['#9A74E9', '#7C5BD6'],
        title: 'خرید اقساطی، بدون ضامن',
        subtitle:
          'باتوجه به سوابق و فاکتورهای مالی، وام و اعتبار بگیر و از\nکل فروشگاه به صورت آنلاین و حضوری خرید کن.',
        imageSrc: '',
      },
    ],
    []
  );

  const STORY_MS = 4500;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const progress = useStoryProgress(slides.length, active, STORY_MS, setActive, paused);

  const goNext = () => setActive((p) => (p + 1) % slides.length);
  const goPrev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  const gesture = useMemo(() => ({ startX: 0, startY: 0, moved: false, downAt: 0 }), []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const current = slides[active];

  return (
    <>
      {/* Top Story */}
      <Box
        onPointerDown={(e) => {
          setPaused(true);
          gesture.startX = e.clientX;
          gesture.startY = e.clientY;
          gesture.moved = false;
          gesture.downAt = performance.now();
        }}
        onPointerMove={(e) => {
          const dx = Math.abs(e.clientX - gesture.startX);
          const dy = Math.abs(e.clientY - gesture.startY);
          if (dx > 6 || dy > 6) gesture.moved = true;
        }}
        onPointerUp={(e) => {
          setPaused(false);

          const dx = e.clientX - gesture.startX;
          const dy = e.clientY - gesture.startY;

          // Swipe (افقی) — مطابق خواسته: چپ → بعدی | راست → قبلی
          if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0)
              goNext(); // سوایپ به چپ → بعدی
            else goPrev(); // سوایپ به راست → قبلی
            return;
          }

          // Long press: فقط pause/resume، هیچ ناوبری انجام نده
          const holdMs = performance.now() - gesture.downAt;
          if (holdMs > 250) return;

          // Tap (بدون حرکت)
          if (!gesture.moved) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;

            // مطابق خواسته: چپ → بعدی | راست → قبلی
            if (x < rect.width / 2) goNext();
            else goPrev();
          }
        }}
        onPointerCancel={() => setPaused(false)}
        sx={{
          width: '100%',
          // position: 'relative',
          height: { xs: 380, sm: 420 },
          px: 2,
          pt: 2,
          overflow: 'hidden',
          background: `linear-gradient(180deg, ${current.bg[0]}, ${current.bg[1]} 20%, rgba(255,255,255,0) 100%)`,
          touchAction: 'pan-y',
        }}
      >
        {/* Progress Bars */}
        <Stack direction="row" spacing={1} sx={{ maxWidth: 760, mx: 'auto', mt: 0.5 }}>
          {Array.from({ length: slides.length }).map((_, i) => (
            <Box
              key={slides[i].key}
              sx={{
                flex: 1,
                height: 6,
                borderRadius: 99,
                bgcolor: alpha('#fff', 0.35),
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: i < active ? '100%' : i > active ? '0%' : `${Math.round(progress * 100)}%`,
                  bgcolor: alpha('#fff', 0.9),
                  transition: i === active ? 'none' : 'width 200ms ease',
                }}
              />
            </Box>
          ))}
        </Stack>

        {/* Content */}
        <Stack
          spacing={1.2}
          sx={{
            maxWidth: 760,
            mx: 'auto',
            mt: 5,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: { xs: 22, sm: 26 } }}>
            {current.title}
          </Typography>

          <Typography sx={{ opacity: 0.92, whiteSpace: 'pre-line', fontSize: { xs: 13, sm: 14 } }}>
            {current.subtitle}
          </Typography>

          <Box
            component="img"
            alt={current.title}
            src={current.imageSrc}
            sx={{
              mt: 2,
              width: { xs: 140, sm: 170 },
              height: 'auto',
              mx: 'auto',
              filter: 'drop-shadow(0 18px 24px rgba(0,0,0,0.22))',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </Stack>

        {/* subtle vignette */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(800px 280px at 50% 30%, rgba(255,255,255,0.12), rgba(255,255,255,0) 65%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Bottom Card */}
      <Box sx={{ position: 'absolute', top: '235px', right: '14px' }}>
        <Paper
          elevation={0}
          sx={{
            width: 400,
            overflow: 'hidden',
            zIndex: (theme) => theme.zIndex.appBar - 1,
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            boxShadow: (theme) => theme.shadows[3],
            bgcolor: 'rgba(255,255,255,0.6)',
          }}
        >
          <Box
            sx={{
              px: 3,
              pt: 2.5,
              pb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 900, fontSize: 20 }}>خوش آمدید!</Typography>
            <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
              جهت ورود، لطفاً شماره موبایل خود را وارد کنید.
            </Typography>
          </Box>

          <Form methods={methods} onSubmit={onSubmit}>
            <Box sx={{ px: 2 }}>
              <Field.Text name="phone" label="شماره موبایل" sx={{ mb: 2 }} />

              <Field.Text
                name="password"
                label="رمزعبور"
                type={password.value ? 'text' : 'password'}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={password.onToggle} edge="end">
                        <Iconify
                          icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="درحال ورود..."
                sx={{ mb: 2 }}
              >
                ورود
              </LoadingButton>
            </Box>
          </Form>
        </Paper>
      </Box>
    </>
  );
}

function useStoryProgress(total, active, durationMs, setActive, paused) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let rafId;
    let start = performance.now();
    let carried = 0;

    const tick = (t) => {
      if (paused) {
        carried = Math.min(durationMs, carried + (t - start));
        start = t;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const elapsed = carried + (t - start);
      const next = Math.min(1, elapsed / durationMs);
      setP(next);

      if (next >= 1) {
        setP(0);
        setActive((prev) => (prev + 1) % total);
        start = performance.now();
        carried = 0;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, durationMs, setActive, total, paused]);

  return p;
}
