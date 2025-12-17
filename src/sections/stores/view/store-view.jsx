'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';

import { StoreOnlineTab } from '../store-online-tab';
import { StoreInPersonTab } from '../store-in_person-tab';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ mt: 3 }}>{children}</Box>}
    </div>
  );
}

export function StoresView() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const navigatingRef = useRef(false);

  const StoresSearchViewPreload = dynamic(
    () => import('./stores-search-view').then((m) => m.StoresSearchView),
    { ssr: false }
  );

  const handleChangeTab = (_event, newValue) => setTab(newValue);

  const targetBase = paths.dashboard.stores.search;
  const goSearchPage = () => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;

    const q = search.trim();
    const url = q ? `${targetBase}?q=${encodeURIComponent(q)}` : targetBase;
    router.push(url);
  };

  useEffect(() => {
    try {
      router.prefetch(targetBase);
    } catch (err) {
      console.log(err);
    }
  }, [router, targetBase]);

  return (
    <>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <StoresSearchViewPreload />
      </Box>

      <DashboardContent>
        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="جست‌وجو در فروشگاه‌ها..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={goSearchPage}
            onClick={goSearchPage}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                goSearchPage();
              }
            }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <InputAdornment position="end">
                    <Iconify icon="mdi:magnify" width={22} />
                  </InputAdornment>
                </InputAdornment>
              ),
            }}
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            variant="outlined"
            size="medium"
          />

          <CustomTabs
            value={tab}
            onChange={handleChangeTab}
            variant="fullWidth"
            sx={{ mt: 2, borderRadius: 1, px: 0.5, maxWidth: 680 }}
            slotProps={{
              scroller: { sx: { px: 0 } },
              flexContainer: { sx: { gap: 1 } },
              indicator: { sx: { '& > span': { width: 40, borderRadius: 2 } } },
              tab: { sx: { px: 3, py: 1.25, textTransform: 'none' } },
              selected: { sx: { color: 'common.white' } },
            }}
          >
            <Tab label="حضوری" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
            <Tab label="آنلاین" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          </CustomTabs>
        </Box>

        <TabPanel value={tab} index={0}>
          <StoreInPersonTab />
        </TabPanel>

        {/* <TabPanel value={tab} index={1}>
          <StoreOnlineTab />
        </TabPanel> */}
      </DashboardContent>
    </>
  );
}
