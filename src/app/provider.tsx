'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import LocaleData from 'dayjs/plugin/localeData';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import setupStore from '@/core/stores';
import { Dialog } from '@/shared/components/molecules';
dayjs.extend(LocalizedFormat);
dayjs.extend(LocaleData);

export let translate: (key: string, params?: Record<string, string>) => string;

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('Messages');

  // Setup store.
  const refStore = useRef<ReturnType<typeof setupStore> | null>(null);
  const refQuery = useRef<QueryClient | null>(null);
  // Create the store instance the first time this renders
  refStore.current ??= setupStore();

  refQuery.current ??= new QueryClient();

  useEffect(() => {
    setTimeout(() => {
      translate = t;
    }, 100);
  }, []);

  return (
    <Provider store={refStore.current}>
      <QueryClientProvider client={refQuery.current}>
        <Dialog />
        {children}
      </QueryClientProvider>
    </Provider>
  );
};
export default RootProvider;
