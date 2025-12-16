'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import { useCountdownDate } from 'src/hooks/use-countdown';

import { varAlpha } from 'src/theme/styles';
import { ComingSoonIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export function ComingSoonView() {
  const countdown = useCountdownDate(new Date('08/08/2025 21:30'));

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 2, fontFamily: 'IRANSans' }}>
        به زودی!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        ما در حال حاضر مشغول کار روی این صفحه هستیم!
      </Typography>

      <ComingSoonIllustration sx={{ my: { xs: 5, sm: 10 } }} />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="روز" value={countdown.days} />
        <TimeBlock label="ساعت" value={countdown.hours} />
        <TimeBlock label="دقیقه" value={countdown.minutes} />
        <TimeBlock label="ثانیه" value={countdown.seconds} />
      </Stack>

      <TextField
        fullWidth
        placeholder="ایمیل خود را وارد کنید"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large">
                به من اطلاع بده
              </Button>
            </InputAdornment>
          ),
          sx: {
            pr: 0.5,
            [`&.${outlinedInputClasses.focused}`]: {
              boxShadow: (theme) => theme.customShadows.z20,
              transition: (theme) =>
                theme.transitions.create(['box-shadow'], {
                  duration: theme.transitions.duration.shorter,
                }),
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                border: (theme) =>
                  `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
              },
            },
          },
        }}
        sx={{ my: 5 }}
      />
    </Container>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div>
      <div> {value} </div>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
