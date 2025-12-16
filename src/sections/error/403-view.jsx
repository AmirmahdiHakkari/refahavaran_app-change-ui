'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';
import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function View403() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2, fontFamily: 'IRANSans' }}>
            دسترسی ندارید!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            صفحه‌ای که می‌خواهید به آن دسترسی پیدا کنید، دسترسی محدودی دارد. لطفاً با مدیر سیستم خود
            تماس بگیرید.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          بازگشت به صفحه اصلی
        </Button>
      </Container>
    </SimpleLayout>
  );
}
