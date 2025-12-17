'use client';

import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import { Box, Grid, Stack, Avatar, Button } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';
import { convertToJalali } from 'src/utils/format-time';

import { _ecommerceLatestProducts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function ProfileTransactionsView() {
  const router = useRouter();
  return (
    <DashboardContent maxWidth="xl">
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 5,
        }}
      >
        <Typography variant="h4">تراکنش‌های من</Typography>
      </Stack>

      <Grid container spacing={3}>
        <Scrollbar sx={{ minHeight: 384 }}>
          <Box
            sx={{
              pl: 3,
              gap: 1,
              minWidth: 360,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {_ecommerceLatestProducts.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </Box>
        </Scrollbar>
      </Grid>
    </DashboardContent>
  );
}

function Item({ item, sx, ...other }) {
  return (
    <Button
      color="inherit"
      // endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
      sx={{
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        py: 2,
        ...sx,
      }}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.name}
        // src={item.coverUrl}
        src=""
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />
      <Box
        sx={{ gap: 0.5, minWidth: 0, display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}
      >
        <Typography noWrap sx={{ display: 'flex', color: 'text.primary', typography: 'subtitle2' }}>
          {item.name}
        </Typography>

        <Box sx={{ display: 'flex', typography: 'body2', color: 'text.secondary' }}>
          <Box component="span">{convertToJalali(item.date)}</Box>
        </Box>
      </Box>
      <Typography noWrap sx={{ color: 'text.primary', typography: 'subtitle2' }}>
        {fCurrency(item.price)}
      </Typography>
    </Button>
  );
}
