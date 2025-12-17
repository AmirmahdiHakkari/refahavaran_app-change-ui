'use client';

import Link from 'next/link';
import nProgress from 'nprogress';
import { useRouter, usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import { Tooltip, IconButton } from '@mui/material';
import { styled, useColorScheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';

import { HeaderSection } from './header-section';

// ----------------------------------------------------------------------

const StyledDivider = styled('span')(({ theme }) => ({
  width: 1,
  height: 10,
  flexShrink: 0,
  display: 'none',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  backgroundColor: 'currentColor',
  color: theme.vars.palette.divider,
  '&::before, &::after': {
    top: -5,
    width: 3,
    height: 3,
    content: '""',
    flexShrink: 0,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'currentColor',
  },
  '&::after': { bottom: -5, top: 'auto' },
}));

// ----------------------------------------------------------------------

export function HeaderBase({ sx, slots, slotProps, layoutQuery, ...other }) {
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname.includes('/auth/jwt/sign-in');
  const isProfilePage = pathname.includes('/dashboard/profile/');
  const isSearchPage = pathname === '/dashboard/stores/search/';
  const isCommingSoonPage = pathname === '/coming-soon/';
  const isHomePage = pathname === '/';

  const { mode, setMode } = useColorScheme();

  const handleBack = () => {
    nProgress.start();

    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(paths.dashboard.profile.view);
    }
  };

  return (
    <HeaderSection
      sx={sx}
      layoutQuery={layoutQuery}
      slots={{
        ...slots,
        leftAreaStart: slots?.leftAreaStart,
        leftArea: (
          <>
            {slots?.leftAreaStart}
            <StyledDivider data-slot="divider" />

            <Logo
              sx={{
                display:
                  isLoginPage || isHomePage ? 'inline-flex' : { xs: 'inline-flex', lg: 'none' },
              }}
            />

            {slots?.leftAreaEnd}
          </>
        ),
        rightArea: (
          <>
            <Box
              data-area="right"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
              }}
            >
              <Tooltip title={mode === 'light' ? 'تبدیل به حالت تیره' : 'تبدیل به حالت روشن'}>
                <IconButton
                  onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                  color="default"
                  aria-label="toggle color scheme"
                >
                  <Iconify icon={mode === 'light' ? 'solar:moon-bold' : 'solar:sun-bold'} />
                </IconButton>
              </Tooltip>

              {!isProfilePage && !isSearchPage && !isCommingSoonPage ? (
                <Tooltip title="پروفایل">
                  <IconButton
                    component={Link}
                    href={paths.dashboard.profile.view}
                    color="default"
                    aria-label="profile"
                  >
                    <Iconify icon="mdi:account" width={25} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="بازگشت">
                  <IconButton onClick={handleBack} color="default" aria-label="back">
                    <Iconify icon="eva:arrow-ios-back-fill" width={24} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            {slots?.rightAreaEnd}
          </>
        ),
      }}
      slotProps={slotProps}
      {...other}
    />
  );
}
