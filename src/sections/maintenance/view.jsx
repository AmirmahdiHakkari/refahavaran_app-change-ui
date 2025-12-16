'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { MaintenanceIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export function MaintenanceView() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h3" sx={{ mb: 2, fontFamily: 'IRANSans' }}>
        وب‌سایت در حال حاضر در دست تعمیر است
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        ما در حال حاضر روی این صفحه کار می‌کنیم!
      </Typography>

      <MaintenanceIllustration sx={{ my: { xs: 5, sm: 10 } }} />

      <Button component={RouterLink} href="/" size="large" variant="contained">
        بازگشت به صفحه اصلی{' '}
      </Button>
    </Box>
  );
}
