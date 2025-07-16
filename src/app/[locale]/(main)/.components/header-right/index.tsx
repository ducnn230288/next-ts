'use client';
import { signOut, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import { Avatar, Icon } from '@/shared/components/atoms';
import { Dropdown } from '@/shared/components/molecules';
import { EIcon } from '@/shared/enums';
import type { TOption } from '@/shared/types';

const HeaderRight = () => {
  const changeTheme = () => {
    const html = document.querySelector('html');
    const dataTheme = html?.getAttribute('data-theme');
    const theme = dataTheme === 'light' ? 'dark' : 'light';
    html?.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const language = useLocale();
  const changeLanguage = (lang: string) => {
    const search = location.search;
    const newPath = location.pathname.replace(`/${language}`, `/${lang}`);
    location.href = `${newPath}${search}`;
  };
  const listLanguage: TOption[] = [
    {
      value: 'en',
      label: 'English',
      icon: EIcon.En,
      onClick: () => changeLanguage('en'),
    },
    {
      value: 'vi',
      label: 'Tiếng Việt',
      icon: EIcon.Vi,
      onClick: () => changeLanguage('vi'),
    },
  ].filter(item => item.value !== language);

  const t = useTranslations('Main/Layout');
  const listMyProfile: TOption[] = [
    {
      value: 'SignOut',
      label: 'SignOut',
      icon: EIcon.Out,
      onClick: async () => {
        const data = await signOut({ redirect: false });
        if (data?.url) window.location.href = '/login';
      },
    },
  ];

  const { data: session } = useSession();
  return (
    <div className="right">
      <Dropdown options={listLanguage} translate={key => key}>
        <button title={t('ChangeLanguage')}>
          <Icon name={language as EIcon} className="rounded-lg size-6" />
        </button>
      </Dropdown>
      <button onClick={changeTheme} title={t('ChangeTheme')}>
        <Icon name={EIcon.DayNight} className="size-6" />
      </button>
      <Dropdown options={listMyProfile} translate={t}>
        <button title={t('MyInformation')}>
          <Avatar text={session?.user?.email ?? ''} classSize={'size-7'} />
        </button>
      </Dropdown>
    </div>
  );
};
export default HeaderRight;
