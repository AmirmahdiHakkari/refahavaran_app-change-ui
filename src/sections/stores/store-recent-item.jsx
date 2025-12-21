import Image from 'next/image';

import ListItemText from '@mui/material/ListItemText';
import { Card, ButtonBase, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function StoreRecentItem({ product, sx, ...other }) {
  return (
    <ButtonBase
      component={RouterLink}
      href="#"
      sx={{
        gap: 1,
        borderRadius: 2,
        display: 'flex',
        cursor: 'pointer',
        position: 'relative',
        p: 1,
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        boxShadow: (theme) => theme.customShadows.z20,
        height: 230,
        ...sx,
      }}
      {...other}
    >
      <Image
        src={`/assets/images/product/${product.coverURL}`}
        alt={product.name || 'product'}
        width={177}
        height={155}
        style={{ borderRadius: 16, marginTop: 10 }}
      />

      <ListItemText
        primary={product.name}
        secondary={
          <Typography variant="caption" color="text.secondary">
            {product.name}
          </Typography>
        }
        primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
        secondaryTypographyProps={{
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
          display: 'inline-flex',
        }}
      />
    </ButtonBase>
  );
}
