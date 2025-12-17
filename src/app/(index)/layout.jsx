'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth/jwt/sign-in');
  }, [router]);

  return <MainLayout>{children}</MainLayout>;
}
