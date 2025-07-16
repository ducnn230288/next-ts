'use client';
import { Dialog } from '@/shared/components/molecules';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

type SessionProviderProps = {
  children: React.ReactNode;
};
export let translate: (key: string, params?: Record<string, string>) => string;

const Provider = ({ children }: SessionProviderProps) => {
  const t = useTranslations('Messages');

  useEffect(() => {
    setTimeout(() => {
      translate = t;
    }, 100);
  }, []);

  return (
    <NextAuthSessionProvider>
      <Dialog />
      {children}
    </NextAuthSessionProvider>
  );
};
export default Provider;
