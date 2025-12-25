import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function CreditCurrentBalance({ list, sx, ...other }) {
  const currency = useBoolean();

  const theme = useTheme();

  const colors = ['primary', 'info', 'success', 'warning', 'error', 'secondary'];

  const carousel = useCarousel();

  return (
    <Box
      sx={{
        mb: 2,
        borderRadius: 2,
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        background: 'transparent',
        '&::before, &::after': {
          left: 0,
          right: 0,
          mx: '28px',
          zIndex: -2,
          height: 40,
          bottom: -16,
          content: "''",
          opacity: 0.16,
          borderRadius: 1.5,
          bgcolor: 'grey.500',
          position: 'absolute',
        },
        '&::after': { mx: '16px', bottom: -8, opacity: 0.32 },
        ...sx,
      }}
      {...other}
    >
      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ right: 16, bottom: 16, position: 'absolute', color: 'primary.main' }}
      />

      <Carousel carousel={carousel} sx={{ color: 'common.white' }}>
        {list.map((item, index) => {
          const itemColor = colors[index % colors.length];

          return (
            <Card
              key={item.id}
              sx={{
                ...bgGradient({
                  color: `135deg, ${varAlpha(
                    theme.vars.palette[itemColor].lighterChannel,
                    0.48
                  )}, ${varAlpha(theme.vars.palette[itemColor].lightChannel, 0.48)}`,
                }),

                boxShadow: 'none',
                position: 'relative',
                color: `${itemColor}.darker`,
                backgroundColor: 'common.white',
                ...sx,
                width: '100%',
                height: 195,
              }}
            >
              <Item
                item={item}
                showCurrency={currency.value}
                onToggleCurrency={currency.onToggle}
              />

              <SvgColor
                src={`${CONFIG.site.basePath}/assets/background/shape-square.svg`}
                sx={{
                  top: 0,
                  left: -20,
                  width: 240,
                  zIndex: -1,
                  height: 240,
                  opacity: 0.24,
                  position: 'absolute',
                  color: `${itemColor}.main`,
                }}
              />
            </Card>
          );
        })}
      </Carousel>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Item({ item, showCurrency, onToggleCurrency }) {
  return (
    <Box sx={{ p: 3, width: 1 }}>
      <div>
        <Box
          sx={{
            mb: 1.5,
            typography: 'subtitle2',
            textAlign: 'end',
          }}
        >
          {item.title}
        </Box>

        <Box
          sx={{
            gap: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
          }}
        >
          <IconButton color="inherit" onClick={onToggleCurrency} sx={{ opacity: 0.48 }}>
            <Iconify icon={showCurrency ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
          </IconButton>

          <Box component="span" dir="rtl" sx={{ typography: 'h4' }}>
            {showCurrency ? '**********' : fCurrency(item.balance)}
          </Box>

          <Box component="span" sx={{ typography: 'h4', opacity: 0.8 }}>
            : مبلغ اعتبار
          </Box>
        </Box>
      </div>

      <Box sx={{ gap: 5, mt: 3 }}>
        <Box sx={{ mb: 1, opacity: 0.48, typography: 'caption', textAlign: 'end' }}>
          تاریخ انقضاء
        </Box>
        <Box component="span" sx={{ display: 'flex', justifyContent: 'end' }}>
          {item.cardValid}
        </Box>
      </Box>
    </Box>
  );
}
