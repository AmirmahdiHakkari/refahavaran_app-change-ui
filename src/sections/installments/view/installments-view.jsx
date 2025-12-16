'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomTabs } from 'src/components/custom-tabs';

import { ThisMonthInstallments } from '../this-month-installments';
import { NextMonthInstallments } from '../next -month-installments';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ mt: 3 }}>{children}</Box>}
    </div>
  );
}

export function InstallmentsView() {
  const [tab, setTab] = useState(0);
  const handleChangeTab = (_event, newValue) => setTab(newValue);

  return (
    <DashboardContent>
      <Box>
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
          <Tab label="ماه جاری" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
          <Tab label="ماه آینده" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
        </CustomTabs>
      </Box>

      <TabPanel value={tab} index={0}>
        <ThisMonthInstallments />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <NextMonthInstallments />
      </TabPanel>
    </DashboardContent>
  );
}
