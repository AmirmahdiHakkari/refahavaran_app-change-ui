import Image from 'next/image';

import { Box, Card, ButtonBase, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function StoreItem({ sx, product }) {
  return (
    <ButtonBase
      component={RouterLink}
      href="#"
      sx={{
        borderRadius: 2,
        px: 1.5,
        py: 0.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...sx,
      }}
      aria-label={product.name || 'product'}
      maxWidth={150}
    >
      <Card
        elevation={0}
        sx={{
          width: 100,
          height: 100,
          borderRadius: 2,
          p: 0,
          overflow: 'visible',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...sx,
        }}
      >
        <Image
          src={`/assets/images/product/${product.coverURL}`}
          alt={product.name || 'product'}
          width={100}
          height={100}
          style={{ borderRadius: 16 }}
        />
      </Card>

      <Box sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant="button" color="text.primary">
          {product.name || 'بدون عنوان'}
        </Typography>
        <Typography noWrap variant="caption" color="text.secondary">
          {product.category || 'بدون کتگوری'}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
