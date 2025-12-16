import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function StoreTitle({
  sx,
  link,
  title,
  onOpen,
  subtitle,
  collapse,
  onCollapse,
  icon,
  ...other
}) {
  return (
    <Stack direction="row" alignItems="center" sx={{ ...sx }} {...other}>
      <Stack flexGrow={1}>
        <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
          {icon && <Iconify icon={icon} width={22} />}

          <Typography variant="h6"> {title} </Typography>
        </Stack>

        <Box sx={{ typography: 'body2', color: 'text.disabled', mt: 0.5 }}>{subtitle}</Box>
      </Stack>

      {link && (
        <Button
          href={link}
          component={RouterLink}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          دیدن همه
        </Button>
      )}

      {onCollapse && (
        <IconButton onClick={onCollapse}>
          <Iconify icon={collapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-upward-fill'} />
        </IconButton>
      )}
    </Stack>
  );
}
