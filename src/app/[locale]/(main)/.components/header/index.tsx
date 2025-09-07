'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { SGlobal, useAppSelector } from '@/core/stores';
import { Avatar, Icon } from '@/shared/components/atoms';
import { Dropdown } from '@/shared/components/molecules';
import { EIcon } from '@/shared/enums';
import type { TOption } from '@/shared/types';
import { logout } from '@/shared/utils';
import './style.scss';

const Component = () => {
  const sGlobal = SGlobal();
  useEffect(() => {
    sGlobal.getUserInfo();
  }, []);

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
      onClick: () => logout(),
    },
  ];

  const user = useAppSelector(state => state.user);
  return (
    <header className="main-header" aria-label={t('Header')}>
      <button className="flex gap-2 items-center">
        <div className="hamburger">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
      </button>
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
            <Avatar text={user?.full_name ?? user?.username} classSize={'size-7'} />
          </button>
        </Dropdown>
      </div>
    </header>
  );
};
export default Component;
