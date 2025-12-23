'use client';

import 'dayjs/locale/fa';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'src/routes/hooks';

import { allLangs } from './all-langs';
import { fallbackLng, changeLangMessages as messages } from './config-locales';

// ----------------------------------------------------------------------

export function useTranslate(ns) {
  const router = useRouter();
  const { t, i18n } = useTranslation(ns);

  // همیشه یک fallback معتبر داشته باش (حتی اگر تنظیمات جایی اشتباه بود)
  const fallback =
    allLangs.find((lang) => lang.value === fallbackLng) ||
    allLangs[0] ||
    { value: 'fa', adapterLocale: 'fa' };

  // نرمال‌سازی زبان: fa-IR -> fa ، و اگر چیز حذف‌شده بود -> fallback
  const resolved = i18n.resolvedLanguage || i18n.language || fallbackLng || 'fa';
  const langCode = String(resolved).split('-')[0];

  const currentLang = allLangs.find((lang) => lang.value === langCode) || fallback;

  const onChangeLang = useCallback(
    async (newLang) => {
      try {
        const nextCode = String(newLang || fallbackLng || 'fa').split('-')[0];

        const langChangePromise = i18n.changeLanguage(nextCode);

        // چون شما فقط فارسی دارید، fallback پیام‌ها هم باید فارسی/ fallbackLng باشد
        const fallbackMessages =
          messages?.[fallbackLng] || messages?.fa || {
            loading: 'در حال تغییر زبان...',
            success: 'زبان با موفقیت تغییر کرد.',
            error: 'خطا در تغییر زبان.',
          };

        const currentMessages = messages?.[nextCode] || fallbackMessages;

        toast.promise(langChangePromise, {
          loading: currentMessages.loading,
          success: () => currentMessages.success,
          error: currentMessages.error,
        });

        // در پروژه تک‌زبانه: Dayjs را مستقیماً روی fa تنظیم کن
        dayjs.locale(nextCode || 'fa');

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [i18n, router]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang,
  };
}
