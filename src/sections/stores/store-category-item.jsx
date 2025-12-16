import Image from 'next/image';

import { Box, Card, ButtonBase, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

export function StoreCategoryItem({ category = {}, sx }) {
  return (
    <ButtonBase
      component={RouterLink}
      href="#"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        ...sx,
      }}
      width={200}
    >
      <Card
        elevation={0}
        sx={{
          width: 80,
          height: 80,
          p: 0,
          overflow: 'visible',
          bgcolor: (theme) => category.color || '#ffffff',
          color: (theme) => theme.palette.getContrastText(category.color || '#ffffff'),
          ...sx,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={`/assets/images/categorys/${category.icon}`}
          alt={category.title || 'category'}
          width={56}
          height={56}
        />
      </Card>

      <Box sx={{ mt: 1, textAlign: 'center', width: '100%' }}>
        <Typography noWrap variant="overline">
          {category.title || 'بدون عنوان'}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
