import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { Iconify } from '../iconify';

export function OtpDrawer({
  open,
  onClose,
  onOpen,
  otpCode,
  remaining,
  totalSeconds = 60,
  cardTitle = 'رمز دوم پویا',
  onCopy,
}) {
  const pct = Math.max(0, Math.min(100, (remaining / totalSeconds) * 100));
  const isLastTen = remaining <= 10;

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      swipeAreaWidth={24}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ pt: 1.2, pb: 1, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            width: 72,
            height: 7,
            borderRadius: 999,
            bgcolor: alpha('#9CB2D6', 0.45),
          }}
        />
      </Box>

      <Box sx={{ px: 3, pb: 3.25 }}>
        <Stack spacing={1} sx={{ mt: 1.5, alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontFamily: 'IRANSans', letterSpacing: 0.2 }}>
            {cardTitle}
          </Typography>

          {/* <Typography
            sx={{
              fontSize: 20,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: 2,
            }}
          >
            {cardNumber}
          </Typography> */}
        </Stack>

        <Box
          sx={{
            mt: 5,
            mb: 5,
            position: 'relative',
            minHeight: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: 38,
              letterSpacing: 3,
              fontVariantNumeric: 'tabular-nums',
              ...(isLastTen && {
                color: '#FF4D4F',
                animation: 'otpPulse 0.9s ease-in-out infinite',
              }),
              '@keyframes otpPulse': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.08)', opacity: 0.85 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          >
            {otpCode}
          </Typography>

          <Box
            sx={{
              position: 'absolute',
              left: 6,
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: (theme) =>
                `conic-gradient(${isLastTen ? '#FF4D4F' : 'rgba(255,255,255,0.12)'} ${pct}%, ${
                  theme.palette.mode === 'light' ? '#5FA8FF' : '#5FA8FF'
                } 0)`,
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 7,
                borderRadius: '50%',
                bgcolor: 'background.default',
              },
            }}
          />
        </Box>

        <Button
          variant="outlined"
          fullWidth
          onClick={onCopy}
          startIcon={<Iconify icon="tabler:copy" width={24} />}
          sx={{
            py: 2,
            fontWeight: 900,
            fontSize: 15,
            color: 'info.main',
            borderColor: 'info.main',
          }}
        >
          کپی کردن
        </Button>
      </Box>
    </SwipeableDrawer>
  );
}
