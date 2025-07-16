'use client';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import setupStore from '@/core/stores';
import { Dialog } from '@/shared/components/molecules';

type SessionProviderProps = {
  children: React.ReactNode;
};
export let translate: (key: string, params?: Record<string, string>) => string;

const RootProvider = ({ children }: SessionProviderProps) => {
  const t = useTranslations('Messages');

  // Setup store.
  const storeRef = useRef<ReturnType<typeof setupStore> | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = setupStore();
  }

  useEffect(() => {
    setTimeout(() => {
      translate = t;
    }, 100);
  }, []);

  return (
    <Provider store={storeRef.current}>
      <NextAuthSessionProvider>
        <Dialog />
        {children}
      </NextAuthSessionProvider>
    </Provider>
  );
};
export default RootProvider;
