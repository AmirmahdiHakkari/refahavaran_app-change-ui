import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProfileCover() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar
          // alt={name}
          // src={avatarUrl}
          sx={{
            mx: 'auto',
            width: 64,
            height: 64,
            border: `solid 2px ${theme.vars.palette.common.white}`,
          }}
        >
          {/* {name?.charAt(0).toUpperCase()} */}ر
        </Avatar>

        <ListItemText
          sx={{
            mt: 2,
            ml: 0,
            textAlign: 'center',
            flex: 'unset',
          }}
          color="inherit"
          primary="امیرمهدی حکاری"
          secondary="09388738548"
          primaryTypographyProps={{ typography: 'h4' }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'body1',
          }}
        />

        <Button
          size="small"
          component={RouterLink}
          href={paths.dashboard.profile.edit('e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1')}
          variant="contained"
          endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
          color="inherit"
          sx={{
            mt: 1,
            ml: 0,
            alignSelf: 'center',
          }}
        >
          ویرایش
        </Button>
      </Stack>
    </Box>
  );
}
