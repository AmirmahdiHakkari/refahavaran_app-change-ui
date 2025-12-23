import { dividerClasses } from '@mui/material/Divider';
import { checkboxClasses } from '@mui/material/Checkbox';
import { menuItemClasses } from '@mui/material/MenuItem';
import { autocompleteClasses } from '@mui/material/Autocomplete';

import { CONFIG } from 'src/config-global';

import { varAlpha } from './utils';

// ----------------------------------------------------------------------

export function bgGradient({ color, imgUrl }) {
  if (imgUrl) {
    return {
      background: `linear-gradient(${color}), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }
  return { background: `linear-gradient(${color})` };
}

export function bgBlur({ color, blur = 6, imgUrl }) {
  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&::before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: color,
      },
    };
  }
  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: color,
  };
}

export function paper({ theme, color, dropdown }) {
  return {
    ...bgBlur({
      color: color ?? varAlpha(theme.vars.palette.background.paperChannel, 0.9),
      blur: 20,
    }),
    backgroundImage: `url(${CONFIG.site.basePath}/assets/cyan-blur.png), url(${CONFIG.site.basePath}/assets/red-blur.png)`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'top right, left bottom',
    backgroundSize: '50%, 50%',
    ...(theme.direction === 'rtl' && {
      backgroundPosition: 'top left, right bottom',
    }),
    ...(dropdown && {
      padding: theme.spacing(0.5),
      boxShadow: theme.customShadows.dropdown,
      borderRadius: `${theme.shape.borderRadius * 1.25}px`,
    }),
  };
}

export function menuItem(theme) {
  return {
    ...theme.typography.body2,
    padding: theme.spacing(0.75, 1),
    borderRadius: theme.shape.borderRadius * 0.75,
    '&:not(:last-of-type)': { marginBottom: 4 },
    [`&.${menuItemClasses.selected}`]: {
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.vars.palette.action.selected,
      '&:hover': { backgroundColor: theme.vars.palette.action.hover },
    },
    [`& .${checkboxClasses.root}`]: {
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.5),
    },
    [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
      backgroundColor: theme.vars.palette.action.selected,
      '&:hover': { backgroundColor: theme.vars.palette.action.hover },
    },
    [`&+.${dividerClasses.root}`]: { margin: theme.spacing(0.5, 0) },
  };
}
