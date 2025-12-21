'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const CARTS_CONFIG = [
  { name: 'رمزعبور', icon: 'eva:lock-fill', Path: '#' },
  {
    name: 'کیف‌‌پول‌های من',
    icon: 'tabler:wallet',
    Path: paths.dashboard.profile.wallets,
  },
  {
    name: 'تراکنش‌های من',
    icon: 'mdi:swap-horizontal',
    Path: paths.dashboard.profile.transactions,
  },
];

export function ProfileManagement() {
  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        مدیریت حساب
      </Typography>

      <Box gap={3} display="grid" gridTemplateColumns="repeat(1, 1fr)">
        {CARTS_CONFIG.map((item) => (
          <Cart key={item.id} config={item} />
        ))}
      </Box>
    </>
  );
}

function Cart({ config }) {
  return (
    <ButtonBase
      component={RouterLink}
      href={config.Path || '#'}
      sx={{ width: '100%', textAlign: 'left' }}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: (theme) => theme.spacing(3, 2, 3, 3),
          height: 79,
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            mr: 2,
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Iconify icon={config.icon} width={22} sx={{ color: 'text.primary' }} />
        </Box>

        <ListItemText
          primary={config.name}
          primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
        />

        <Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />
      </Card>
    </ButtonBase>
  );
}
