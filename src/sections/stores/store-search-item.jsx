import { ButtonBase, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function StoreSearchItem({ sx, product }) {
  return (
    <ButtonBase
      component={RouterLink}
      href="#"
      sx={{
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
        bgcolor: 'background.paper',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...sx,
      }}
      aria-label={product.name || 'product'}
      maxWidth={150}
    >
      <Typography noWrap variant="button" color="text.primary">
        {product.name || 'بدون عنوان'}
      </Typography>
      <Iconify icon="solar:alt-arrow-left-linear" width={18} sx={{ opacity: 0.6, ml: 1 }} />
    </ButtonBase>
  );
}
