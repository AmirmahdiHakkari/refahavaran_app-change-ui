const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  contact: '/contact-us',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    supabase: {
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    credit: `${ROOTS.DASHBOARD}/credit`,
    profile: {
      view: `${ROOTS.DASHBOARD}/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/profile/${id}/edit`,
      wallets: `${ROOTS.DASHBOARD}/profile/wallets`,
      transactions: `${ROOTS.DASHBOARD}/profile/transactions`,
    },
    stores: {
      root: `${ROOTS.DASHBOARD}/stores`,
      search: `${ROOTS.DASHBOARD}/stores/search/`,
    },
    identify: {
      login: `${ROOTS.DASHBOARD}/login`,
      otp: `${ROOTS.DASHBOARD}/otp`,
      status: `${ROOTS.DASHBOARD}/status`,
    },
    installments: `${ROOTS.DASHBOARD}/installments`,
    root: ROOTS.DASHBOARD,
    blank: `${ROOTS.DASHBOARD}/blank`,
  },
};
