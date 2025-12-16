import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';
import { convertToJalali } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function CreditLatestTransaction({ title, subheader, list, ...other }) {
  const router = useRouter();
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
            onClick={() => router.push(paths.dashboard.profile.transactions)}
          >
            دیدن همه
          </Button>
        }
      />

      <Scrollbar sx={{ minHeight: 384 }}>
        <Box
          sx={{
            p: 3,
            gap: 1,
            minWidth: 360,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {list.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      </Scrollbar>
    </Card>
  );
}

function Item({ item, sx, ...other }) {
  return (
    <Button
      color="inherit"
      // endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
      sx={{
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        py:2,
        ...sx,
      }}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.name}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />
      <Box
        sx={{ gap: 0.5, minWidth: 0, display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}
      >
        <Typography noWrap sx={{ display: 'flex', color: 'text.primary', typography: 'subtitle2' }}>
          {item.name}
        </Typography>

        <Box sx={{ display: 'flex', typography: 'body2', color: 'text.secondary' }}>
          <Box component="span">{convertToJalali(item.date)}</Box>
        </Box>
      </Box>
      <Typography noWrap sx={{ color: 'text.primary', typography: 'subtitle2' }}>
        {fCurrency(item.price)}
      </Typography>
    </Button>
  );
}
