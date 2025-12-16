'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { m, animate, AnimatePresence } from 'framer-motion';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Card, Stack, Button, Divider, Tooltip, Typography, IconButton } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

/* ---------------- utils ---------------- */
function faDate(d) {
  return new Intl.DateTimeFormat('fa-IR', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(d);
}

/* ---------- framer-motion variants ---------- */
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 140, damping: 16 },
  },
};

/* ---------- Animated amount (count-up) ---------- */
function AmountTicker({ value, duration = 1.25, className, sx }) {
  const [display, setDisplay] = useState(fCurrency(0));

  useEffect(() => {
    const to = Number(value) || 0;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(fCurrency(Math.floor(v))),
    });
    return () => controls.stop();
  }, [value, duration]);

  return (
    <Typography
      component="span"
      variant="h4"
      fontWeight={900}
      className={className}
      sx={{ lineHeight: 1, p: 1, ...sx }}
    >
      {display}
    </Typography>
  );
}

/* -------------- small helpers ----------- */
function NumberDot({ children }) {
  return (
    <Box
      sx={(t) => ({
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        bgcolor: t.palette.common.white,
        color: t.palette.primary.main,
        border: `2px solid ${t.palette.primary.main}`,
        boxShadow: `0 2px 10px rgba(79,70,229,0.15)`,
      })}
    >
      <Typography variant="subtitle1" fontWeight={900}>
        {children}
      </Typography>
    </Box>
  );
}

function Row({ label, value, copyable }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(false), 1200);
    return () => {
      if (t) clearTimeout(t);
    };
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(String(value));
      setCopied(true);
    } catch {
      // ignore
    }
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1, px: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ minWidth: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            direction: 'ltr',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: 220,
          }}
          title={String(value)}
        >
          {value}
        </Typography>

        {copyable ? (
          <Tooltip placement="top" title={copied ? 'کپی شد!' : 'کپی'} arrow>
            <IconButton
              size="small"
              onClick={handleCopy}
              aria-label="کپی"
              disableRipple
              sx={{
                ml: 0.25,
                p: 0.5,
                color: 'text.secondary',
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'text.primary',
                  transform: 'translateY(-1px)',
                },
                transition: (t) =>
                  t.transitions.create(['color', 'transform'], {
                    duration: t.transitions.duration.shorter,
                  }),
              }}
            >
              <AnimatePresence initial={false} mode="wait">
                {copied ? (
                  <m.span
                    key="check"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <Iconify icon="solar:check-circle-bold" width={18} />
                  </m.span>
                ) : (
                  <m.span
                    key="copy"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <Iconify icon="solar:copy-bold" width={18} />
                  </m.span>
                )}
              </AnimatePresence>
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
    </Stack>
  );
}

/* -------------- main view --------------- */
export function IdentifyStatusView() {
  const sp = useSearchParams();
  const result = sp.get('result') || 'success';
  const merchant = sp.get('merchant') || 'نارون';
  const amount = sp.get('amount') || '100000';
  const ref = sp.get('ref') || 'NV-984213';
  const start = sp.get('start') || '';

  const baseDate = useMemo(() => (start ? new Date(start) : new Date()), [start]);
  const schedule = useMemo(
    () =>
      [0, 30, 60, 90].map((off) => {
        const d = new Date(baseDate);
        d.setDate(d.getDate() + off);
        return d;
      }),
    [baseDate]
  );

  const palette = {
    success: { from: '#10b981', to: '#059669', title: 'پرداخت با موفقیت انجام شد' },
    fail: { from: '#ef4444', to: '#dc2626', title: 'پرداخت ناموفق بود' },
    pending: { from: '#f59e0b', to: '#d97706', title: 'پرداخت در حال پردازش است' },
  }[result] || { from: '#10b981', to: '#059669', title: 'پرداخت با موفقیت انجام شد' };

  return (
    <DashboardContent>
      {/* کانتینر برای انیمیشن استگر کل صفحه */}
      <m.div key={sp.toString()} variants={container} initial="hidden" animate="visible">
        {/* کارت رسید */}
        <m.div variants={item}>
          <Card sx={{ overflow: 'hidden', borderRadius: 3, mb: 3 }}>
            <Box
              sx={{
                px: 3,
                py: 2.5,
                color: 'common.white',
                background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
              }}
            >
              <Typography variant="h6" fontWeight={800}>
                {palette.title}
              </Typography>

              <Box
                sx={{
                  mt: 1.5,
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 1.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.18)',
                }}
              >
                <AmountTicker value={amount} />
              </Box>

              <Typography variant="body2" sx={{ mt: 0.75, opacity: 0.9 }}>
                فروشگاه {merchant}
              </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
              <Stack divider={<Divider />} spacing={1}>
                <Row label="شماره مرجع" value={ref} copyable />
                <Row label="فروشگاه" value={merchant} />
                <Row label="مبلغ" value={`${fCurrency(Number(amount))} ریال`} />
                <Row label="زمان ثبت" value={faDate(new Date())} />
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  color="inherit"
                  variant="contained"
                  onClick={() => window.print()}
                >
                  دانلود/چاپ رسید
                </Button>
                <Button fullWidth variant="outlined">
                  بازگشت
                </Button>
              </Stack>
            </Box>
          </Card>
        </m.div>

        <m.div variants={item}>
          <Card sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight={900} sx={{ mb: 2 }}>
              برنامهٔ اقساط
            </Typography>

            <Timeline
              position="left"
              sx={{
                direction: 'rtl',
                pl: 0,
                '& .MuiTimelineItem-root:before': { display: 'none' },
              }}
            >
              <m.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                {schedule.map((d, idx) => {
                  const n = idx + 1;
                  const isLast = idx === schedule.length - 1;

                  return (
                    <TimelineItem key={idx} component={m.li} variants={item} sx={{ minHeight: 68 }}>
                      <TimelineSeparator>
                        <NumberDot>{n.toLocaleString('fa-IR')}</NumberDot>
                        {isLast ? null : <TimelineConnector sx={{ bgcolor: 'divider' }} />}
                      </TimelineSeparator>

                      <TimelineContent sx={{ py: 0.75 }}>
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 0.25 }}>
                            قسط {n.toLocaleString('fa-IR')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {faDate(d)}
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </m.div>
            </Timeline>
          </Card>
        </m.div>
      </m.div>
    </DashboardContent>
  );
}
