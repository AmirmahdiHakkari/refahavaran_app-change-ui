'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const ITEMS = [
  {
    id: '1',
    storeName: 'دیجی‌کالا',
    purchaseType: 'online',
    logoUrl: 'https://logo.clearbit.com/digikala.com',
    dueThisMonth: 1250000,
  },
  {
    id: '2',
    storeName: 'اسنپ‌مارکت',
    purchaseType: 'online',
    logoUrl: 'https://logo.clearbit.com/snapp.market',
    dueThisMonth: 890000,
  },
  {
    id: '3',
    storeName: 'هایپر استار',
    purchaseType: 'inperson',
    logoUrl: 'https://logo.clearbit.com/hyperstar.ir',
    dueThisMonth: 540000,
  },
  {
    id: '4',
    storeName: 'هایپر استار',
    purchaseType: 'inperson',
    logoUrl: 'https://logo.clearbit.com/hyperstar.ir',
    dueThisMonth: 540000,
  },
  {
    id: '5',
    storeName: 'هایپر استار',
    purchaseType: 'inperson',
    logoUrl: 'https://logo.clearbit.com/hyperstar.ir',
    dueThisMonth: 540000,
  },
];

function formatToman(value) {
  const n = Number(value || 0);
  return `${n.toLocaleString('fa-IR')} تومان`;
}

function purchaseTypeLabel(type) {
  return type === 'online' ? 'آنلاین' : 'حضوری';
}

function purchaseTypeColor(type) {
  return type === 'online' ? 'info.main' : 'success.main';
}

// ----------------------------------------------------------------------

export function ThisMonthInstallments() {
  const total = useMemo(
    () => ITEMS.reduce((sum, item) => sum + Number(item.dueThisMonth || 0), 0),
    []
  );

  return (
    <>
      <Stack spacing={1.5} sx={{ pb: 2 }}>
        {ITEMS.map((item) => (
          <Card
            key={item.id}
            sx={(theme) => ({
              bgcolor: 'background.paper',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.customShadows.card,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: theme.palette.mode === 'dark' ? '#00b8d954' : '#22c55e36',
            })}
          >
            <CardContent sx={{ py: 1.75, '&:last-child': { pb: 1.75 } }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar
                  src={item.logoUrl}
                  alt={item.storeName}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    border: '2px solid',
                    borderColor: 'divider',
                  }}
                  imgProps={{ referrerPolicy: 'no-referrer' }}
                >
                  {item.storeName?.[0] || 'S'}
                </Avatar>

                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography variant="subtitle1" noWrap sx={{ lineHeight: 1.2 }}>
                    {item.storeName}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.6,
                      color: 'text.secondary',
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: purchaseTypeColor(item.purchaseType),
                        display: 'inline-block',
                      }}
                    />
                    خرید {purchaseTypeLabel(item.purchaseType)}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                    {formatToman(item.dueThisMonth)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box
        sx={(theme) => ({
          bgcolor: 'background.paper',
          boxShadow: theme.customShadows.card,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: theme.palette.mode === 'dark' ? '#00b8d954' : '#22c55e36',
          borderRadius: 2,
          p: 2,
        })}
      >
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          مبلغ قابل پرداخت
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.2 }}>
              {formatToman(total)}
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              جمع کل اقساط این ماه
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<Iconify icon="mdi:credit-card-outline" width={20} />}
            sx={{ px: 3, bgcolor: '#22C55E !important' }}
          >
            پرداخت
          </Button>
        </Stack>
      </Box>
    </>
  );
}
