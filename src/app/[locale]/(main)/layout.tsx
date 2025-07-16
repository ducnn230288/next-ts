import { getTranslations } from 'next-intl/server';

import { Icon } from '@/shared/components/atoms';
import { EIcon } from '@/shared/enums';
import Components from './.components';
import './style.scss';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslations('Main/Layout');

  return (
    <div className="admin">
      <div className="wrapper">
        <header aria-label={t('RightSide')}>
          <button className="flex gap-2 items-center">
            <Icon className="size-7" name={EIcon.Logo} />
            <h1>{t('AppName')}</h1>
          </button>
          <Components.HeaderRight />
        </header>
        <main>{children}</main>
        <footer>{t('Footer', { year: new Date().getFullYear() })}</footer>
      </div>
    </div>
  );
}
