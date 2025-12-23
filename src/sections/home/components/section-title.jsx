import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function SectionTitle({ title, caption, slotProps, txtGradient, description, ...other }) {
  const theme = useTheme();

  return (
    <Stack spacing={1} {...other} mb={2}>
      {caption && <SectionCaption title={caption} />}

      {/* <Typography
        component={m.h2}
        variant="subtitle1"
        variants={slotProps?.title?.variants ?? varFade({ distance: 24 }).inUp}
        sx={{ color: 'text.secondary' }}
      >
        {`${title} `}
        <Box
          component="span"
          sx={{
            opacity: 0.4,
            display: 'inline-block',
            ...textGradient(
              `to right, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
            ),
          }}
        >
          {txtGradient}
        </Box>
      </Typography> */}

      {/* {description && (
        <Typography
          component={m.p}
          variants={slotProps?.description?.variants ?? varFade({ distance: 24 }).inUp}
          sx={{ color: 'text.secondary', ...slotProps?.description?.sx }}
        >
          {description}
        </Typography>
      )} */}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function SectionCaption({ title, variants, sx }) {
  return (
    <Stack
      component={m.span}
      sx={{ typography: 'h2', color: 'text.primary', fontFamily: 'IRANSans', ...sx }}
    >
      {title}
    </Stack>
  );
}
