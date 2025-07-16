'use client';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { usePathname } from '@/core/lib/i18n/navigation';
import { Button } from '@/shared/components/atoms';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  function changeLanguage(locale: string) {
    router.replace(`/${locale}${pathname}`);
  }

  const fnSignOut = async () => {
    const data = await signOut({ redirect: false });
    if (data?.url) window.location.href = '/login';
  };

  const t = useTranslations('HomePage');

  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('vi')} style={{ marginLeft: 8 }}>
        Vietnamese
      </button>
      {t('About')}
      <Button text={'Sign out'} onClick={fnSignOut} />
    </div>
  );
}
