import { getTranslations } from 'next-intl/server';

import Components from './.components';
import './style.scss';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslations('Main/Layout');

  return (
    <div className="admin">
      <Components.Sidebar />
      <div className="wrapper">
        <Components.Header />
        <main>{children}</main>
        <footer>{t('Footer', { year: new Date().getFullYear() })}</footer>
      </div>
    </div>
  );
}
