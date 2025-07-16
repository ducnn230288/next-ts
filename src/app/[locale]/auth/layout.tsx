import { getTranslations } from 'next-intl/server';

import { Icon } from '@/shared/components/atoms';
import { EIcon } from '@/shared/enums';
import './style.scss';

const Layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const t = await getTranslations('Auth/Layout');

  return (
    <div className="login">
      <div className="wrapper">
        <header className="-intro-x">
          <div className="block-grap-1">
            <Icon name={EIcon.Logo} className="size-6" />
            <h4>{t('AppName')}</h4>
          </div>
          <h5 className="uppercase">{t('EnterpriseManagementSystem')}</h5>
        </header>
        <main className="intro-x">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
