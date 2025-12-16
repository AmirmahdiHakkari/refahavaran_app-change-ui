// 'use client';

// import Box from '@mui/material/Box';
// import Portal from '@mui/material/Portal';
// import LinearProgress from '@mui/material/LinearProgress';

// // ----------------------------------------------------------------------

// export function LoadingScreen({ portal, sx, ...other }) {
//   const content = (
//     <Box
//       sx={{
//         px: 5,
//         width: 1,
//         flexGrow: 1,
//         minHeight: 1,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         ...sx,
//       }}
//       {...other}
//     >
//       <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
//     </Box>
//   );

//   if (portal) {
//     return <Portal>{content}</Portal>;
//   }

//   return content;
// }


'use client';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomTabs } from 'src/components/custom-tabs';

// ----------------------------------------------------------------------

function SearchBarSkeleton() {
  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Skeleton variant="rounded" height={48} />

      <CustomTabs
        value={0}
        onChange={() => {}}
        variant="fullWidth"
        sx={{ borderRadius: 1, px: 0.5, maxWidth: 680 }}
        slotProps={{
          scroller: { sx: { px: 0 } },
          flexContainer: { sx: { gap: 1 } },
          indicator: { sx: { '& > span': { width: 40, borderRadius: 2 } } },
          tab: { sx: { px: 3, py: 1.25, textTransform: 'none' } },
          selected: { sx: { color: 'common.white' } },
        }}
      >
        <Tab
          disabled
          label={<Skeleton variant="rounded" width={64} height={20} />}
          id="stores-skeleton-tab-0"
          aria-controls="stores-skeleton-tabpanel-0"
        />
        <Tab
          disabled
          label={<Skeleton variant="rounded" width={64} height={20} />}
          id="stores-skeleton-tab-1"
          aria-controls="stores-skeleton-tabpanel-1"
        />
      </CustomTabs>
    </Stack>
  );
}

function RowTitleSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Skeleton variant="text" width="40%" height={28} />
      <Skeleton variant="text" width="15%" height={28} sx={{ mr: 2 }} />
    </Box>
  );
}

function HScrollCategoriesSkeleton() {
  return (
    <Box sx={{ mb: 3, overflowX: 'auto' }}>
      <Stack direction="row" spacing={2} sx={{ minWidth: 'max-content', py: 0.5 }}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Box
            key={idx}
            sx={{
              width: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Skeleton variant="rectangular" sx={{ borderRadius: 2 }} width={64} height={64} />
            <Skeleton variant="text" width={72} height={16} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function SliderSkeleton() {
  return (
    <Card
      sx={{
        height: 210,
        borderRadius: 2,
        overflow: 'hidden',
        mb: 4,
        bgcolor: 'grey.900',
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ opacity: 0.5, bgcolor: 'grey.800' }}
      />
    </Card>
  );
}

function HScrollCardsSkeleton() {
  return (
    <Box sx={{ mb: 3, overflowX: 'auto' }}>
      <Stack direction="row" spacing={2} sx={{ minWidth: 'max-content', py: 0.5 }}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Card
            key={idx}
            sx={{
              width: 120,
              borderRadius: 2,
              p: 1.5,
              flexShrink: 0,
            }}
          >
            <Skeleton variant="rounded" width="100%" height={90} />
            <Skeleton variant="text" width="80%" height={18} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" height={14} />
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

function GridTwoColCardsSkeleton() {
  return (
    <Box
      sx={{
        mb: 4,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'stretch',
        '@media (max-width:375px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      <Skeleton variant="rounded" height={140} />
      <Skeleton variant="rounded" height={140} />
      <Skeleton variant="rounded" height={180} sx={{ gridColumn: '1 / -1' }} />
    </Box>
  );
}

function GridPopularStoresSkeleton() {
  return (
    <Box
      sx={{
        mb: 5,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        alignItems: 'stretch',
        '@media (max-width:350px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card
          key={idx}
          sx={{
            gap: 1,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            p: 1.5,
            height: 230,
          }}
        >
          <Skeleton variant="rounded" width="100%" height={150} />
          <Skeleton variant="text" width="70%" height={18} />
          <Skeleton variant="text" width="50%" height={14} />
        </Card>
      ))}
    </Box>
  );
}

export function LoadingScreen({ portal, sx, ...other }) {
  return (
    <DashboardContent>
      <SearchBarSkeleton />

      <RowTitleSkeleton />
      <HScrollCategoriesSkeleton />

      <SliderSkeleton />

      <RowTitleSkeleton />
      <HScrollCardsSkeleton />

      <RowTitleSkeleton />
      <HScrollCardsSkeleton />

      <GridTwoColCardsSkeleton />

      <RowTitleSkeleton />
      <HScrollCardsSkeleton />

      <RowTitleSkeleton />
      <HScrollCardsSkeleton />

      <SliderSkeleton />

      <RowTitleSkeleton />
      <HScrollCardsSkeleton />

      <RowTitleSkeleton />
      <GridPopularStoresSkeleton />
    </DashboardContent>
  );
}
