/* eslint-disable perfectionist/sort-imports */

'use client';

import 'dayjs/locale/fa';

import dayjs from 'dayjs';
import { useEffect } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';

import { useTranslate } from './use-locales';

// ----------------------------------------------------------------------

export function LocalizationProvider({ children }) {
  const { currentLang } = useTranslate();

  const adapterLocale = currentLang?.adapterLocale || 'fa';

  useEffect(() => {
    dayjs.locale(adapterLocale);
  }, [adapterLocale]);

  return (
    <Provider dateAdapter={AdapterDayjs} adapterLocale={adapterLocale}>
      {children}
    </Provider>
  );
}
