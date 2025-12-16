'use client';

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks/use-pathname';
import { hasParams, removeParams, isExternalLink, removeLastSlash } from 'src/routes/utils';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { NavSectionHorizontalItem } from 'src/components/nav-section';

const navData = [
  { title: 'اعتبار', path: paths.dashboard.credit },
  { title: 'فروشگاه', path: paths.dashboard.stores.root },
  { title: 'اقساط', path: paths.dashboard.installments },
];

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const pathnameRaw = usePathname();
  const pathname = removeLastSlash(pathnameRaw || '');

  const background = isDark ? 'rgba(18,18,18,0.52)' : 'rgba(255,255,255,0.6)';
  const borderColor = isDark
    ? varAlpha(theme.palette.grey['500Channel'], 0.08)
    : varAlpha(theme.palette.grey['500Channel'], 0.12);

  const iconMap = {
    اعتبار: 'mdi:cash',
    فروشگاه: 'mdi:storefront',
    اقساط: 'mdi:bank-transfer',
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        height: 'var(--layout-footer-height, 72px)',
        position: mounted ? 'fixed' : 'relative',
        mb: 2,
        left: 0,
        right: 0,
        bottom: 0,
        mx: 2,
        zIndex: theme.zIndex.appBar - 1,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        background,
        borderTop: `1px solid ${borderColor}`,
        boxShadow: theme.shadows[3],
        borderRadius: 2,
      }}
    >
      <Container maxWidth sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-around' }}>
          {navData.map((item) => {
            const itemPath = item.path || '';

            let active = false;

            const notValid = !itemPath || itemPath.startsWith('#') || isExternalLink(itemPath);

            if (!notValid) {
              const pathHasParams = hasParams(itemPath);
              const isDeep = true || pathHasParams;

              if (isDeep) {
                const defaultActive = pathname.includes(itemPath);
                const originItemPath = removeParams(itemPath);
                const hasParamsActive = pathHasParams && originItemPath === pathname;
                active = defaultActive || hasParamsActive;
              } else {
                active = pathname === itemPath;
              }
            }

            return (
              <NavSectionHorizontalItem
                key={item.title}
                title={item.title}
                depth={1}
                path={item.path}
                active={active}
                icon={<Iconify icon={iconMap[item.title] || 'eva:circle-fill'} width={22} />}
                slotProps={{
                  sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 1,
                    py: 1,
                    '--nav-item-root-active-color': theme.palette.success.main,
                    '--nav-item-root-active-color-on-dark': theme.palette.success.main,
                    [stylesMode.dark]: {
                      '--nav-item-root-active-color': theme.palette.success.main,
                      '--nav-item-root-active-color-on-dark': theme.palette.success.main,
                    },
                  },
                  title: { sx: { mt: 0.25 } },
                }}
              />
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
