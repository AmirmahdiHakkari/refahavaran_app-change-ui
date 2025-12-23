import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { stylesMode } from 'src/theme/styles';

import { Iconify } from '../../iconify';
import { useFooterItem } from '../hooks';
import { FooterSectionClasses } from '../classes';
import { stateClasses, sharedStyles } from '../styles';

// ----------------------------------------------------------------------

export const FooterItem = forwardRef(
  (
    {
      path,
      icon,
      info,
      title,
      caption,
      //
      open,
      depth,
      render,
      active,
      disabled,
      hasChild,
      slotProps,
      externalLink,
      enabledRootRedirect,
      ...other
    },
    ref
  ) => {
    const navItem = useFooterItem({
      path,
      icon,
      info,
      depth,
      render,
      hasChild,
      externalLink,
      enabledRootRedirect,
    });

    return (
      <StyledNavItem
        ref={ref}
        aria-label={title}
        depth={depth}
        active={active}
        disabled={disabled}
        open={open && !active}
        sx={{
          ...slotProps?.sx,
          [`& .${FooterSectionClasses.item.icon}`]: slotProps?.icon,
          [`& .${FooterSectionClasses.item.title}`]: slotProps?.title,
          [`& .${FooterSectionClasses.item.caption}`]: slotProps?.caption,
          [`& .${FooterSectionClasses.item.info}`]: slotProps?.info,
          [`& .${FooterSectionClasses.item.arrow}`]: slotProps?.arrow,
        }}
        className={stateClasses({ open: open && !active, active, disabled })}
        {...navItem.baseProps}
        {...other}
      >
        {icon && (
          <Box component="span" className={FooterSectionClasses.item.icon}>
            {navItem.renderIcon}
          </Box>
        )}

        {title && (
          <Box component="span" className={FooterSectionClasses.item.title}>
            {title}
          </Box>
        )}

        {caption && (
          <Tooltip title={caption} arrow>
            <Iconify icon="eva:info-outline" className={FooterSectionClasses.item.caption} />
          </Tooltip>
        )}

        {info && (
          <Box component="span" className={FooterSectionClasses.item.info}>
            {navItem.renderInfo}
          </Box>
        )}

        {hasChild && (
          <Iconify
            icon={navItem.subItem ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-downward-fill'}
            className={FooterSectionClasses.item.arrow}
          />
        )}
      </StyledNavItem>
    );
  }
);

// ----------------------------------------------------------------------

const StyledNavItem = styled(ButtonBase, {
  shouldForwardProp: (prop) =>
    prop !== 'active' && prop !== 'open' && prop !== 'disabled' && prop !== 'depth',
})(({ active, open, disabled, depth, theme }) => {
  const rootItem = depth === 1;

  const subItem = !rootItem;

  const baseStyles = {
    item: {
      flexShrink: 0,
      color: 'var(--nav-item-color)',
      borderRadius: 'var(--nav-item-radius)',
      '&:hover': {
        backgroundColor: 'var(--nav-item-hover-bg)',
      },
    },

    title: {
      ...theme.typography.body2,
      fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
    },

    caption: {
      width: 16,
      height: 16,
      color: 'var(--nav-item-caption-color)',
    },

    icon: {
      ...sharedStyles.icon,
      width: 24,
      height: 'var(--nav-icon-size)',
    },

    arrow: { ...sharedStyles.arrow },
    info: { ...sharedStyles.info },
  };

  return {
    /**
     * Root item
     */
    ...(rootItem && {
      ...baseStyles.item,
      padding: 'var(--nav-item-root-padding)',
      minHeight: 'var(--nav-item-root-height)',
      [`& .${FooterSectionClasses.item.icon}`]: {
        ...baseStyles.icon,
        margin: 'var(--nav-icon-root-margin)',
      },
      [`& .${FooterSectionClasses.item.title}`]: {
        ...baseStyles.title,
        whiteSpace: 'nowrap',
      },
      [`& .${FooterSectionClasses.item.caption}`]: {
        ...baseStyles.caption,
        marginLeft: theme.spacing(0.75),
      },
      [`& .${FooterSectionClasses.item.arrow}`]: { ...baseStyles.arrow },
      [`& .${FooterSectionClasses.item.info}`]: { ...baseStyles.info },
      // State
      ...(active && {
        color: 'var(--nav-item-root-active-color)',
        backgroundColor: 'var(--nav-item-root-active-bg)',
        '&:hover': {
          backgroundColor: 'var(--nav-item-root-active-hover-bg)',
        },
        [stylesMode.dark]: {
          color: 'var(--nav-item-root-active-color-on-dark)',
        },
      }),
      ...(open && {
        color: 'var(--nav-item-root-open-color)',
        backgroundColor: 'var(--nav-item-root-open-bg)',
      }),
    }),

    /**
     * Sub item
     */
    ...(subItem && {
      ...baseStyles.item,
      padding: 'var(--nav-item-sub-padding)',
      minHeight: 'var(--nav-item-sub-height)',
      color: theme.vars.palette.text.secondary,
      [`& .${FooterSectionClasses.item.icon}`]: {
        ...baseStyles.icon,
        margin: 'var(--nav-icon-sub-margin)',
      },
      [`& .${FooterSectionClasses.item.title}`]: {
        ...baseStyles.title,
        flexGrow: 1,
      },
      [`& .${FooterSectionClasses.item.caption}`]: { ...baseStyles.caption },
      [`& .${FooterSectionClasses.item.arrow}`]: {
        ...baseStyles.arrow,
        marginRight: theme.spacing(-0.5),
      },
      [`& .${FooterSectionClasses.item.info}`]: { ...baseStyles.info },
      // State
      ...(active && {
        color: 'var(--nav-item-sub-active-color)',
        backgroundColor: 'var(--nav-item-sub-active-bg)',
      }),
      ...(open && {
        color: 'var(--nav-item-sub-open-color)',
        backgroundColor: 'var(--nav-item-sub-open-bg)',
      }),
    }),

    /* Disabled */
    ...(disabled && sharedStyles.disabled),
  };
});
