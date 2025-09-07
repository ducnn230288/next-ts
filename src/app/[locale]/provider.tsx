'use client';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { SGlobal } from '@/core/store';

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale();
  const sGlobal = SGlobal();

  useEffect(() => {
    sGlobal.setLanguage(locale);
  }, [locale]);

  return children;
};
export default LocaleProvider;
