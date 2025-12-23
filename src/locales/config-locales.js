export const fallbackLng = 'en';
export const languages = ['en', 'fr', 'vi', 'cn', 'ar'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages = {
  fa: {
    success: 'زبان با موفقیت تغییر کرد!',
    error: 'خطا در تغییر زبان!',
    loading: 'در حال بارگذاری...',
  },
};
