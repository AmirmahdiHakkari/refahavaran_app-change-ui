'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';
import { convertToJalali } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { EmptyContent } from './empty-content';

// ----------------------------------------------------------------------

const drawerBleeding = 56;

const Puller = styled('div')(({ theme }) => ({
  width: 48,
  height: 5,
  borderRadius: 999,
  backgroundColor: theme.palette.text.disabled,
  position: 'absolute',
  top: 10,
  left: 'calc(50% - 24px)',
}));

function formatJalaliDateTime(dateLike) {
  if (!dateLike) return '-';

  const d = new Date(dateLike);
  const isValid = !Number.isNaN(d.getTime());

  const datePart = convertToJalali(dateLike);
  const timePart = isValid
    ? d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    : '';

  return timePart ? `${datePart} - ${timePart}` : datePart;
}

function pickTrackingCode(item) {
  return (
    item.trackingCode ??
    item.tracking_code ??
    item.refCode ??
    item.referenceCode ??
    item.reference ??
    item.traceId ??
    '-'
  );
}

function pickBalanceBefore(item) {
  return (
    item.balanceBefore ?? item.beforeBalance ?? item.balance_before ?? item.prevBalance ?? null
  );
}

function pickBalanceAfter(item) {
  return item.balanceAfter ?? item.afterBalance ?? item.balance_after ?? item.newBalance ?? null;
}

function pickTxType(item) {
  return item.txType ?? item.type ?? item.transactionType ?? '-';
}

async function shareText({ title, text }) {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, text });
      return { ok: true, method: 'share' };
    } catch {
      return { ok: false, method: 'share' };
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return { ok: true, method: 'clipboard' };
    } catch {
      // continue
    }
  }

  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return { ok: true, method: 'execCommand' };
  } catch {
    return { ok: false, method: 'none' };
  }
}

// ----------------------------------------------------------------------

/**
 * Optional prop:
 * onSaveNote?: async (id, noteText) => void
 */
export function CreditLatestTransaction({ title, subheader, list, onSaveNote, ...other }) {
  const isEmpty = !list || list.length === 0;

  // Only one expanded row at a time
  const [expandedId, setExpandedId] = useState(null);

  // Note drawer state
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteItem, setNoteItem] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);

  // Refs for focus/visibility
  const noteInputRef = useRef(null);
  const noteContentRef = useRef(null);

  // Keyboard handling
  const [keyboardInset, setKeyboardInset] = useState(0);
  const baseInnerHeightRef = useRef(0);

  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleOpenNote = (item) => {
    setNoteItem(item);
    setNoteText(item?.note ?? '');
    setNoteOpen(true);
  };

  const handleCloseNote = () => {
    setNoteOpen(false);
  };

  const handleConfirmNote = async () => {
    if (!noteItem?.id) {
      setNoteOpen(false);
      return;
    }

    try {
      setNoteSaving(true);
      if (onSaveNote) {
        await onSaveNote(noteItem.id, noteText);
      }
      setNoteOpen(false);
    } finally {
      setNoteSaving(false);
    }
  };

  // --- FIXED useEffect #1 (lint-safe + keyboard inset) ---
  useEffect(() => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const vv = window.visualViewport;

    const updateInset = () => {
      let inset = 0;

      if (vv) {
        inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      } else if (baseInnerHeightRef.current) {
        inset = Math.max(0, baseInnerHeightRef.current - window.innerHeight);
      }

      setKeyboardInset(inset);
    };

    if (noteOpen) {
      baseInnerHeightRef.current = window.innerHeight;
    }

    updateInset();

    if (vv) {
      vv.addEventListener('resize', updateInset);
      vv.addEventListener('scroll', updateInset);
    }

    window.addEventListener('resize', updateInset);
    window.addEventListener('orientationchange', updateInset);

    return () => {
      if (vv) {
        vv.removeEventListener('resize', updateInset);
        vv.removeEventListener('scroll', updateInset);
      }
      window.removeEventListener('resize', updateInset);
      window.removeEventListener('orientationchange', updateInset);
    };
  }, [noteOpen]);

  // --- FIXED useEffect #2 (lint-safe + autofocus) ---
  useEffect(() => {
    if (!noteOpen) {
      return () => {};
    }

    const t = window.setTimeout(() => {
      // Focus first (bring keyboard)
      if (noteInputRef.current) {
        try {
          noteInputRef.current.focus?.({ preventScroll: true });
        } catch {
          noteInputRef.current.focus?.();
        }
      }

      // Ensure visible inside sheet
      if (noteInputRef.current?.scrollIntoView) {
        noteInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 250);

    return () => {
      window.clearTimeout(t);
    };
  }, [noteOpen]);

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          isEmpty ? null : (
            <Button
              size="small"
              color="inherit"
              href={paths.dashboard.profile.transactions}
              component="a"
              endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
            >
              دیدن همه
            </Button>
          )
        }
      />

      <Scrollbar sx={{ minHeight: 384 }}>
        <Box
          sx={{
            p: 3,
            gap: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isEmpty ? (
            <EmptyContent filled title="تراکنشی وجود ندارد" sx={{ py: 2 }} />
          ) : (
            list.map((item) => (
              <TransactionRow
                key={item.id}
                item={item}
                expanded={expandedId === item.id}
                onToggle={() => {
                  handleToggle(item.id);
                }}
                onOpenNote={() => {
                  handleOpenNote(item);
                }}
              />
            ))
          )}
        </Box>
      </Scrollbar>

      {/* Note Bottom Sheet */}
      <SwipeableDrawer
        anchor="bottom"
        open={noteOpen}
        onClose={handleCloseNote}
        onOpen={() => {
          setNoteOpen(true);
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        swipeAreaWidth={drawerBleeding}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'visible',

            bottom: `${keyboardInset}px`,

            maxHeight: `calc(100dvh - ${keyboardInset}px)`,

            pb: 'env(safe-area-inset-bottom)',
          },
        }}
      >
        {/* Content */}
        <Box
          ref={noteContentRef}
          sx={{
            px: 2,
            pt: 2,
            height: '100%',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              یادداشت تراکنش
            </Typography>

            <IconButton onClick={handleCloseNote} aria-label="close">
              <Iconify icon="eva:close-fill" width={20} />
            </IconButton>
          </Stack>

          <Divider />

          <TextField
            fullWidth
            multiline
            minRows={4}
            autoFocus
            inputRef={noteInputRef}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="یادداشت خود را بنویسید..."
          />

          {/* Sticky actions: always visible (and not under keyboard) */}
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              bgcolor: 'background.paper',
              pt: 2,
              pb: 3,
            }}
          >
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleCloseNote}
                disabled={noteSaving}
                sx={{ py: 1.5 }}
              >
                انصراف
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleConfirmNote}
                disabled={noteSaving}
                sx={{ py: 1.5 }}
              >
                تایید
              </Button>
            </Stack>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Card>
  );
}

function TransactionRow({ item, expanded, onToggle, onOpenNote }) {
  const trackingCode = pickTrackingCode(item);

  const balanceBefore = pickBalanceBefore(item);
  const balanceAfter = pickBalanceAfter(item);

  const dateTime = formatJalaliDateTime(item.date ?? item.createdAt ?? item.created_at);
  const txType = pickTxType(item);

  const details = useMemo(
    () => [
      { label: 'کد رهگیری', value: trackingCode },
      { label: 'نوع تراکنش', value: txType },
      { label: 'تاریخ و ساعت', value: dateTime },
      { label: 'موجودی قبل', value: balanceBefore == null ? '-' : fCurrency(balanceBefore) },
      { label: 'موجودی بعد', value: balanceAfter == null ? '-' : fCurrency(balanceAfter) },
    ],
    [trackingCode, txType, dateTime, balanceBefore, balanceAfter]
  );

  const handleShare = async () => {
    const sharePayload = {
      title: 'جزئیات تراکنش',
      text:
        `عنوان: ${item.name ?? '-'}\n` +
        `مبلغ: ${typeof item.price !== 'undefined' ? fCurrency(item.price) : '-'}\n` +
        `کد رهگیری: ${trackingCode}\n` +
        `تاریخ و ساعت: ${dateTime}\n` +
        `نوع: ${txType}`,
    };

    await shareText(sharePayload);
  };

  const isDeposit = item.txType === 'واریز' || item.txType === 'بازپرداخت';

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <ButtonBase
        onClick={onToggle}
        sx={{
          width: '100%',
          textAlign: 'left',
          px: 2,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          variant="rounded"
          alt={item.name}
          src=""
          sx={{ width: 48, height: 48, flexShrink: 0 }}
        />

        <Box
          sx={{
            minWidth: 0,
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Typography noWrap sx={{ color: 'text.primary', typography: 'subtitle2' }}>
            {item.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" noWrap>
            {convertToJalali(item.date ?? item.createdAt ?? item.created_at)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          {/* <Typography noWrap sx={{ color: 'text.primary', typography: 'subtitle2' }}>
            {typeof item.price !== 'undefined' ? fCurrency(item.price) : '-'}
          </Typography> */}

          <Typography
            noWrap
            sx={(theme) => ({
              typography: 'subtitle2',
              color: isDeposit
                ? theme.palette.mode === 'dark'
                  ? theme.vars.palette.primary.main
                  : theme.vars.palette.primary.dark
                : theme.vars.palette.text.primary,
            })}
          >
            {fCurrency(item.price)}
          </Typography>

          <Iconify
            icon="eva:chevron-down-fill"
            width={22}
            sx={{
              transition: 'transform 180ms ease',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              color: 'text.secondary',
            }}
          />
        </Box>
      </ButtonBase>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <Box sx={{ px: 2, py: 1.5 }}>
          <Stack spacing={1.25}>
            {details.map((row) => (
              <DetailRow key={row.label} label={row.label} value={row.value} />
            ))}

            <Divider sx={{ my: 1 }} />

            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleShare}
                startIcon={<Iconify icon="solar:share-bold" width={18} />}
              >
                اشتراک‌گذاری
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={onOpenNote}
                startIcon={<Iconify icon="solar:pen-new-square-bold" width={18} />}
              >
                یادداشت
              </Button>
            </Stack>

            {item.note ? (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  یادداشت:
                </Typography>
                <Typography variant="body2">{item.note}</Typography>
              </Box>
            ) : null}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}

function DetailRow({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'left' }}>
        {String(value ?? '-')}
      </Typography>
    </Stack>
  );
}
//

// 'use client';

// import React, { useEffect, useMemo, useRef, useState } from 'react';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Avatar from '@mui/material/Avatar';
// import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import TextField from '@mui/material/TextField';
// import { styled } from '@mui/material/styles';

// import { paths } from 'src/routes/paths';

// import { fCurrency } from 'src/utils/format-number';
// import { convertToJalali } from 'src/utils/format-time';

// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';

// import { EmptyContent } from './empty-content';

// // ----------------------------------------------------------------------

// const drawerBleeding = 56;

// const Puller = styled('div')(({ theme }) => ({
//   width: 48,
//   height: 5,
//   borderRadius: 999,
//   backgroundColor: theme.palette.text.disabled,
//   position: 'absolute',
//   top: 10,
//   left: 'calc(50% - 24px)',
// }));

// function formatJalaliDateTime(dateLike) {
//   if (!dateLike) return '-';

//   const d = new Date(dateLike);
//   const isValid = !Number.isNaN(d.getTime());

//   const datePart = convertToJalali(dateLike);
//   const timePart = isValid
//     ? d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
//     : '';

//   return timePart ? `${datePart} - ${timePart}` : datePart;
// }

// function pickTrackingCode(tx) {
//   return (
//     tx.trackingCode ??
//     tx.tracking_code ??
//     tx.refCode ??
//     tx.referenceCode ??
//     tx.reference ??
//     tx.traceId ??
//     '-'
//   );
// }

// function pickBalanceBefore(tx) {
//   return tx.balanceBefore ?? tx.beforeBalance ?? tx.balance_before ?? tx.prevBalance ?? null;
// }

// function pickBalanceAfter(tx) {
//   return tx.balanceAfter ?? tx.afterBalance ?? tx.balance_after ?? tx.newBalance ?? null;
// }

// function pickTxType(tx) {
//   return tx.txType ?? tx.type ?? tx.transactionType ?? '-';
// }

// async function shareText({ title, text }) {
//   if (typeof navigator !== 'undefined' && navigator.share) {
//     try {
//       await navigator.share({ title, text });
//       return { ok: true, method: 'share' };
//     } catch {
//       return { ok: false, method: 'share' };
//     }
//   }

//   if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
//     try {
//       await navigator.clipboard.writeText(text);
//       return { ok: true, method: 'clipboard' };
//     } catch {
//       // continue
//     }
//   }

//   try {
//     const ta = document.createElement('textarea');
//     ta.value = text;
//     ta.setAttribute('readonly', '');
//     ta.style.position = 'fixed';
//     ta.style.top = '-9999px';
//     document.body.appendChild(ta);
//     ta.select();
//     document.execCommand('copy');
//     document.body.removeChild(ta);
//     return { ok: true, method: 'execCommand' };
//   } catch {
//     return { ok: false, method: 'none' };
//   }
// }

// // ----------------------------------------------------------------------

// /**
//  * Optional prop:
//  * onSaveNote?: async (id, noteText) => void
//  */
// export function CreditLatestTransaction({ title, subheader, list, onSaveNote, ...other }) {
//   const isEmpty = !list || list.length === 0;

//   const [openSheet, setOpenSheet] = useState(false);
//   const [selected, setSelected] = useState(null);

//   // Note drawer state
//   const [noteOpen, setNoteOpen] = useState(false);
//   const [noteText, setNoteText] = useState('');
//   const [noteSaving, setNoteSaving] = useState(false);

//   // Focus & keyboard handling for note drawer
//   const noteInputRef = useRef(null);
//   const noteContentRef = useRef(null);
//   const [keyboardInset, setKeyboardInset] = useState(0);
//   const baseInnerHeightRef = useRef(0);

//   const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

//   const handleOpen = (tx) => {
//     setSelected(tx);
//     setOpenSheet(true);
//   };

//   const handleClose = () => {
//     setOpenSheet(false);
//   };

//   const sheetTitle = useMemo(() => {
//     if (!selected) return 'جزئیات تراکنش';
//     return selected.name || 'جزئیات تراکنش';
//   }, [selected]);

//   const handleOpenNote = () => {
//     if (!selected) return;
//     setNoteText(selected.note ?? '');
//     setNoteOpen(true);
//   };

//   const handleCloseNote = () => {
//     setNoteOpen(false);
//   };

//   const handleConfirmNote = async () => {
//     if (!selected?.id) {
//       setNoteOpen(false);
//       return;
//     }

//     try {
//       setNoteSaving(true);
//       if (onSaveNote) {
//         await onSaveNote(selected.id, noteText);
//       }
//       // اگر می‌خواهی همان لحظه در UI هم آپدیت شود:
//       setSelected((prev) => (prev ? { ...prev, note: noteText } : prev));
//       setNoteOpen(false);
//     } finally {
//       setNoteSaving(false);
//     }
//   };

//   // Keyboard inset (lint-safe: always return a cleanup function)
//   useEffect(() => {
//     if (typeof window === 'undefined') {
//       return () => {};
//     }

//     const vv = window.visualViewport;

//     const updateInset = () => {
//       let inset = 0;

//       if (vv) {
//         inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
//       } else if (baseInnerHeightRef.current) {
//         inset = Math.max(0, baseInnerHeightRef.current - window.innerHeight);
//       }

//       setKeyboardInset(inset);
//     };

//     if (noteOpen) {
//       baseInnerHeightRef.current = window.innerHeight;
//     }

//     updateInset();

//     if (vv) {
//       vv.addEventListener('resize', updateInset);
//       vv.addEventListener('scroll', updateInset);
//     }

//     window.addEventListener('resize', updateInset);
//     window.addEventListener('orientationchange', updateInset);

//     return () => {
//       if (vv) {
//         vv.removeEventListener('resize', updateInset);
//         vv.removeEventListener('scroll', updateInset);
//       }
//       window.removeEventListener('resize', updateInset);
//       window.removeEventListener('orientationchange', updateInset);
//     };
//   }, [noteOpen]);

//   // Auto-focus note input (lint-safe)
//   useEffect(() => {
//     if (!noteOpen) {
//       return () => {};
//     }

//     const t = window.setTimeout(() => {
//       if (noteInputRef.current) {
//         try {
//           noteInputRef.current.focus?.({ preventScroll: true });
//         } catch {
//           noteInputRef.current.focus?.();
//         }
//       }

//       if (noteInputRef.current?.scrollIntoView) {
//         noteInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }, 250);

//     return () => {
//       window.clearTimeout(t);
//     };
//   }, [noteOpen]);

//   return (
//     <Card {...other}>
//       <CardHeader
//         title={title}
//         subheader={subheader}
//         action={
//           isEmpty ? null : (
//             <Button
//               size="small"
//               color="inherit"
//               href={paths.dashboard.profile.transactions}
//               component="a"
//               endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
//             >
//               دیدن همه
//             </Button>
//           )
//         }
//       />

//       <Scrollbar sx={{ minHeight: 384 }}>
//         <Box
//           sx={{
//             p: 3,
//             gap: 1,
//             // اگر با 450px کار می‌کنی و اسکرول افقی دیدی، این را حذف کن
//             minWidth: 360,
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           {isEmpty ? (
//             <EmptyContent filled title="تراکنشی وجود ندارد" sx={{ py: 2 }} />
//           ) : (
//             list.map((item) => (
//               <Item
//                 key={item.id}
//                 item={item}
//                 onClick={() => {
//                   handleOpen(item);
//                 }}
//               />
//             ))
//           )}
//         </Box>
//       </Scrollbar>

//       {/* Swipeable Bottom Sheet - Transaction Details */}
//       <SwipeableDrawer
//         anchor="bottom"
//         open={openSheet}
//         onClose={handleClose}
//         onOpen={() => {
//           setOpenSheet(true);
//         }}
//         disableBackdropTransition={!iOS}
//         disableDiscovery={iOS}
//         swipeAreaWidth={drawerBleeding}
//         ModalProps={{ keepMounted: true }}
//         PaperProps={{
//           sx: {
//             overflow: 'visible',
//             height: '50dvh',
//           },
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: -drawerBleeding,
//             left: 0,
//             right: 0,
//             height: drawerBleeding,
//             borderTopLeftRadius: 16,
//             borderTopRightRadius: 16,
//             bgcolor: 'background.paper',
//           }}
//         >
//           <Puller />
//         </Box>

//         <Box
//           sx={{
//             px: 2,
//             pt: 2,
//             pb: 2,
//             height: '100%',
//             overflow: 'auto',
//             WebkitOverflowScrolling: 'touch',
//           }}
//         >
//           <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//               {sheetTitle}
//             </Typography>

//             <IconButton onClick={handleClose} aria-label="close">
//               <Iconify icon="eva:close-fill" width={20} />
//             </IconButton>
//           </Stack>

//           <Divider sx={{ mb: 2 }} />

//           {selected ? (
//             <TransactionDetails
//               tx={selected}
//               onShare={async () => {
//                 const trackingCode = pickTrackingCode(selected);
//                 const txType = pickTxType(selected);
//                 const dateTime = formatJalaliDateTime(
//                   selected.date ?? selected.createdAt ?? selected.created_at
//                 );

//                 await shareText({
//                   title: 'جزئیات تراکنش',
//                   text:
//                     `عنوان: ${selected.name ?? '-'}\n` +
//                     `مبلغ: ${typeof selected.price !== 'undefined' ? fCurrency(selected.price) : '-'}\n` +
//                     `کد رهگیری: ${trackingCode}\n` +
//                     `موجودی قبل: ${
//                       pickBalanceBefore(selected) == null
//                         ? '-'
//                         : fCurrency(pickBalanceBefore(selected))
//                     }\n` +
//                     `موجودی بعد: ${
//                       pickBalanceAfter(selected) == null
//                         ? '-'
//                         : fCurrency(pickBalanceAfter(selected))
//                     }\n` +
//                     `تاریخ و ساعت: ${dateTime}\n` +
//                     `نوع: ${txType}`,
//                 });
//               }}
//               onOpenNote={handleOpenNote}
//             />
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               تراکنشی انتخاب نشده است.
//             </Typography>
//           )}

//           <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
//             <Button fullWidth variant="contained" onClick={handleClose}>
//               بستن
//             </Button>
//           </Stack>
//         </Box>
//       </SwipeableDrawer>

//       {/* Swipeable Bottom Sheet - Note */}
//       <SwipeableDrawer
//         anchor="bottom"
//         open={noteOpen}
//         onClose={handleCloseNote}
//         onOpen={() => {
//           setNoteOpen(true);
//         }}
//         disableBackdropTransition={!iOS}
//         disableDiscovery={iOS}
//         swipeAreaWidth={drawerBleeding}
//         ModalProps={{ keepMounted: true }}
//         PaperProps={{
//           sx: {
//             // borderTopLeftRadius: 16,
//             // borderTopRightRadius: 16,
//             overflow: 'visible',
//             pb: 3,
//             bottom: `${keyboardInset}px`,
//             maxHeight: `calc(100dvh - ${keyboardInset}px)`,
//           },
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: -drawerBleeding,
//             left: 0,
//             right: 0,
//             height: drawerBleeding,
//             // borderTopLeftRadius: 16,
//             // borderTopRightRadius: 16,
//             bgcolor: 'background.paper',
//           }}
//         >
//           <Puller />
//         </Box>

//         <Box
//           ref={noteContentRef}
//           sx={{
//             px: 2,
//             pt: 2,
//             height: '100%',
//             overflow: 'auto',
//             WebkitOverflowScrolling: 'touch',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 2,
//           }}
//         >
//           <Stack direction="row" alignItems="center" justifyContent="space-between">
//             <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//               یادداشت تراکنش
//             </Typography>

//             <IconButton onClick={handleCloseNote} aria-label="close">
//               <Iconify icon="eva:close-fill" width={20} />
//             </IconButton>
//           </Stack>

//           <Divider />

//           <TextField
//             fullWidth
//             multiline
//             minRows={4}
//             autoFocus
//             inputRef={noteInputRef}
//             value={noteText}
//             onChange={(e) => setNoteText(e.target.value)}
//             placeholder="یادداشت خود را بنویسید..."
//           />

//           <Box
//             sx={{
//               position: 'sticky',
//               bottom: 0,
//               bgcolor: 'background.paper',
//               pt: 2,
//               pb: 'env(safe-area-inset-bottom)',
//             }}
//           >
//             <Stack direction="row" spacing={1}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={handleCloseNote}
//                 disabled={noteSaving}
//                 sx={{ py: 1.5 }}
//               >
//                 انصراف
//               </Button>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={handleConfirmNote}
//                 disabled={noteSaving}
//                 sx={{ py: 1.5 }}
//               >
//                 تایید
//               </Button>
//             </Stack>
//           </Box>
//         </Box>
//       </SwipeableDrawer>
//     </Card>
//   );
// }

// function Item({ item, sx, onClick, ...other }) {
//   return (
//     <Button
//       color="inherit"
//       onClick={onClick}
//       sx={{
//         gap: 2,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         py: 2,
//         textAlign: 'left',
//         ...sx,
//       }}
//       {...other}
//     >
//       <Avatar
//         variant="rounded"
//         alt={item.name}
//         src=""
//         sx={{ width: 48, height: 48, flexShrink: 0 }}
//       />

//       <Box
//         sx={{
//           gap: 0.5,
//           minWidth: 0,
//           display: 'flex',
//           flex: '1 1 auto',
//           flexDirection: 'column',
//         }}
//       >
//         <Typography noWrap sx={{ display: 'flex', color: 'text.primary', typography: 'subtitle2' }}>
//           {item.name}
//         </Typography>

//         <Box sx={{ display: 'flex', typography: 'body2', color: 'text.secondary' }}>
//           <Box component="span">{convertToJalali(item.date)}</Box>
//         </Box>
//       </Box>

//       <Typography noWrap sx={{ color: 'text.primary', typography: 'subtitle2' }}>
//         {fCurrency(item.price)}
//       </Typography>
//     </Button>
//   );
// }

// function TransactionDetails({ tx, onShare, onOpenNote }) {
//   const trackingCode = pickTrackingCode(tx);
//   const balanceBefore = pickBalanceBefore(tx);
//   const balanceAfter = pickBalanceAfter(tx);
//   const txType = pickTxType(tx);
//   const dateTime = formatJalaliDateTime(tx.date ?? tx.createdAt ?? tx.created_at);

//   return (
//     <Stack spacing={1.25}>
//       <Row label="کد رهگیری" value={trackingCode} />
//       <Row label="نوع تراکنش" value={txType} />
//       <Row label="تاریخ و ساعت" value={dateTime} />

//       <Row label="موجودی قبل" value={balanceBefore == null ? '-' : fCurrency(balanceBefore)} />
//       <Row label="موجودی بعد" value={balanceAfter == null ? '-' : fCurrency(balanceAfter)} />

//       <Row label="مبلغ" value={typeof tx.price !== 'undefined' ? fCurrency(tx.price) : '-'} />

//       {tx.note ? <Row label="یادداشت" value={tx.note} /> : null}

//       <Divider sx={{ my: 1 }} />

//       <Stack direction="row" spacing={1}>
//         <Button
//           fullWidth
//           variant="outlined"
//           onClick={() => {
//             onShare?.();
//           }}
//           startIcon={<Iconify icon="solar:share-bold" width={18} />}
//         >
//           اشتراک‌گذاری
//         </Button>

//         <Button
//           fullWidth
//           variant="contained"
//           onClick={() => {
//             onOpenNote?.();
//           }}
//           startIcon={<Iconify icon="solar:pen-new-square-bold" width={18} />}
//         >
//           یادداشت
//         </Button>
//       </Stack>
//     </Stack>
//   );
// }

// function Row({ label, value }) {
//   return (
//     <Stack direction="row" justifyContent="space-between" spacing={2}>
//       <Typography variant="body2" color="text.secondary">
//         {label}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'left' }}>
//         {String(value ?? '-')}
//       </Typography>
//     </Stack>
//   );
// }
