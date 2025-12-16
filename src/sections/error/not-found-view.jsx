'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function NotFoundView() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer} sx={{ textAlign: 'center', direction: 'rtl' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            متأسفیم! صفحه موردنظر پیدا نشد
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            صفحه‌ای که دنبالش هستید در دسترس نیست. ممکنه آدرس رو اشتباه وارد کرده باشید یا لینک
            تغییر کرده باشه. لطفاً آدرس رو دوباره بررسی کنید.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button
          component={RouterLink}
          href={paths.dashboard.stores.root}
          size="large"
          variant="contained"
          aria-label="بازگشت به صفحه اصلی"
        >
          بازگشت به صفحهٔ اصلی
        </Button>
      </Container>
    </SimpleLayout>
  );
}
