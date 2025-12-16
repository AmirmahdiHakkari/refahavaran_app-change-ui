'use client';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export const Logo = forwardRef(
  ({ width = 40, height = 40, disableLink = false, className, href = '/', sx, ...other }, ref) => {
    const logo = (
      <Box component="img" alt="logo" src="/logo/refahAvaran.png" width={30} height={30} />
    );

    return (
      <NoSsr
        fallback={
          <Box
            width={width}
            height={height}
            className={logoClasses.root.concat(className ? ` ${className}` : '')}
            sx={{
              p: 5,
              flexShrink: 0,
              display: 'inline-flex',
              verticalAlign: 'middle',
              ...sx,
            }}
          />
        }
      >
        {logo}
      </NoSsr>
    );
  }
);
