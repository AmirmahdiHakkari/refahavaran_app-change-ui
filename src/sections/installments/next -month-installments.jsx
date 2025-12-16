'use client';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const CARD_RADIUS = 2;

const getAccentBorderColor = (theme) => (theme.palette.mode === 'dark' ? '#00b8d954' : '#22c55e36');

const getAccentBackgroundColor = (theme, active) =>
  theme.palette.mode === 'dark'
    ? active
      ? theme.palette.info.main
      : ''
    : active
      ? theme.palette.success.main
      : '';

// ----------------------------------------------------------------------

const MONTHS = [
  {
    monthKey: 'dey',
    monthLabel: 'دی',
    currentInstallment: 3,
    totalInstallments: 12,
    items: [
      {
        id: 'd1',
        storeName: 'دیجی‌کالا',
        purchaseType: 'online',
        logoUrl: 'https://logo.clearbit.com/digikala.com',
        dueThisMonth: 1250000,
      },
      {
        id: 'd2',
        storeName: 'اسنپ‌مارکت',
        purchaseType: 'online',
        logoUrl: 'https://logo.clearbit.com/snapp.market',
        dueThisMonth: 890000,
      },
    ],
  },
  {
    monthKey: 'bahman',
    monthLabel: 'بهمن',
    currentInstallment: 4,
    totalInstallments: 12,
    items: [
      {
        id: 'b1',
        storeName: 'هایپر استار',
        purchaseType: 'inperson',
        logoUrl: 'https://logo.clearbit.com/hyperstar.ir',
        dueThisMonth: 540000,
      },
      {
        id: 'b2',
        storeName: 'هایپر استار',
        purchaseType: 'inperson',
        logoUrl: 'https://logo.clearbit.com/hyperstar.ir',
        dueThisMonth: 540000,
      },
    ],
  },
  {
    monthKey: 'esfand',
    monthLabel: 'اسفند',
    currentInstallment: 5,
    totalInstallments: 12,
    items: [
      {
        id: 'e1',
        storeName: 'دیجی‌کالا',
        purchaseType: 'online',
        logoUrl: 'https://logo.clearbit.com/digikala.com',
        dueThisMonth: 410000,
      },
    ],
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

function StepDots({ current = 1, total = 1 }) {
  const safeTotal = Math.max(1, Number(total || 1));
  const safeCurrent = Math.max(1, Math.min(safeTotal, Number(current || 1)));

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.6,
        justifyContent: 'flex-end',
        maxWidth: 220,
        lineHeight: 0,
      }}
    >
      {Array.from({ length: safeTotal }).map((_, i) => {
        const active = i < safeCurrent;

        return (
          <Box
            key={i}
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              bgcolor: (theme) => getAccentBackgroundColor(theme, active),
              border: '1px solid',
              borderColor: active ? 'primary.main' : 'divider',
              opacity: active ? 1 : 0.9,
            }}
          />
        );
      })}
    </Box>
  );
}

function InstallmentRow({ item }) {
  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        borderRadius: CARD_RADIUS,
        overflow: 'hidden',
        boxShadow: 'none',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
      })}
    >
      <CardContent sx={{ py: 1.75, '&:last-child': { pb: 1.75 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            src={item.logoUrl}
            alt={item.storeName}
            sx={(theme) => ({
              width: 44,
              height: 44,
              borderRadius: CARD_RADIUS,
              bgcolor: 'background.default',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: theme.palette.divider,
            })}
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
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              بدهی این ماه
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function NextMonthInstallments() {
  const [selectedMonths, setSelectedMonths] = useState({});

  const toggleMonth = (key) => {
    setSelectedMonths((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedMonthKeys = useMemo(
    () => Object.keys(selectedMonths).filter((k) => selectedMonths[k]),
    [selectedMonths]
  );

  const total = useMemo(
    () =>
      MONTHS.reduce((sum, m) => {
        if (!selectedMonths[m.monthKey]) return sum;
        const monthTotal = m.items.reduce((s, it) => s + Number(it.dueThisMonth || 0), 0);
        return sum + monthTotal;
      }, 0),
    [selectedMonths]
  );

  const canPay = total > 0;

  return (
    <Box>
      <Stack spacing={1.5} sx={{ pb: 2 }}>
        {MONTHS.map((m, idx) => {
          const totalMonth = m.items.reduce((sum, it) => sum + Number(it.dueThisMonth || 0), 0);
          const cur = m.currentInstallment || 1;
          const tot = m.totalInstallments || 1;
          const checked = !!selectedMonths[m.monthKey];

          return (
            <Box
              key={m.monthKey}
              sx={(theme) => ({
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: checked ? getAccentBorderColor(theme) : theme.palette.divider,
                borderRadius: CARD_RADIUS,
                overflow: 'hidden',
                bgcolor: 'background.paper',
              })}
            >
              <Accordion
                defaultExpanded={idx === 0}
                disableGutters
                elevation={0}
                sx={{
                  boxShadow: 'none',
                  borderRadius: 0,
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary
                  expandIcon={<Iconify icon="mdi:chevron-down" width={22} />}
                  sx={{
                    px: 2,
                    py: 1.25,
                    minHeight: 84,
                    '& .MuiAccordionSummary-content': { my: 0 },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ width: 1 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
                      <Checkbox
                        checked={checked}
                        onClick={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                        onChange={() => toggleMonth(m.monthKey)}
                        inputProps={{ 'aria-label': `select month ${m.monthLabel}` }}
                        sx={{
                          p: 0.5,
                          mr: 0.5,
                          '&.Mui-checked': {
                            color: (theme) => getAccentBackgroundColor(theme),
                          },
                        }}
                      />

                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 900 }} noWrap>
                          اقساط ماه {m.monthLabel}
                        </Typography>

                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          مجموع این ماه: {formatToman(totalMonth)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box sx={{ textAlign: 'left', flexShrink: 0 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                        قسط {cur.toLocaleString('fa-IR')} از {tot.toLocaleString('fa-IR')}
                      </Typography>

                      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 0.75 }}>
                        <StepDots current={cur} total={tot} />
                      </Stack>
                    </Box>
                  </Stack>
                </AccordionSummary>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <AccordionDetails sx={{ p: 2 }}>
                  <Stack spacing={1.5}>
                    {m.items.map((item) => (
                      <InstallmentRow key={item.id} item={item} />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })}
      </Stack>

      <Box
        sx={(theme) => ({
          bgcolor: 'background.paper',
          boxShadow: theme.customShadows.card,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: getAccentBorderColor(theme),
          borderRadius: CARD_RADIUS,
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
              {selectedMonthKeys.length
                ? `${selectedMonthKeys.length.toLocaleString('fa-IR')} ماه انتخاب شده`
                : 'هیچ ماهی انتخاب نشده'}
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            disabled={!canPay}
            startIcon={<Iconify icon="mdi:credit-card-outline" width={20} />}
            sx={(theme) => ({
              px: 3,
              bgcolor: '#22C55E !important',
              color: theme.palette.mode === 'dark' ? '#000000 !important' : '#FFFFFF !important',
              '&:hover': {
                bgcolor: '#22C55E',
              },
              '&.Mui-disabled': {
                bgcolor: '#22C55E',
                color: '#FFFFFF',
                opacity: 0.7,
              },
            })}
          >
            پرداخت
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
