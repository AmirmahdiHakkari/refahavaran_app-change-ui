import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export function ProfileWallets({ list, sx, ...other }) {
  const theme = useTheme();
  const colors = ['primary', 'info', 'success', 'warning', 'error', 'secondary'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }} {...other}>
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
            <Item item={item} color={itemColor} />

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
    </Box>
  );
}

function Item({ item }) {
  const currency = useBoolean();

  return (
    <Box sx={{ p: 3, width: 1 }}>
      <div>
        <Box
          sx={{
            mb: 1.5,
            typography: 'subtitle2',
            textAlign: 'start',
          }}
        >
          {item.title}
        </Box>

        <Box
          sx={{
            gap: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
         >
          <Box component="span" sx={{ typography: 'h4', opacity: 0.8 }}>
            مبلغ اعتبار :
          </Box>

          <Box component="span" sx={{ typography: 'h4' }}>
            {currency.value ? '**********' : fCurrency(item.balance)}
          </Box>

          <IconButton onClick={currency.onToggle} sx={{ opacity: 0.48 }}>
            <Iconify icon={currency.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
          </IconButton>
        </Box>
      </div>

      <Box sx={{ gap: 5, mt: 3 }}>
        <Box sx={{ mb: 1, opacity: 0.48, typography: 'caption', textAlign: 'start' }}>
          تاریخ انقضاء
        </Box>
        <Box component="span" sx={{ display: 'flex', justifyContent: 'start' }}>
          {item.cardValid}
        </Box>
      </Box>
    </Box>
  );
}
