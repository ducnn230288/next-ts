import { getTranslations } from 'next-intl/server';

import LanguageSwitcher from './components/LanguageSwitcher';
import './style.scss';
export const dynamic = 'force-dynamic';

const Page = async () => {
  const t = await getTranslations('HomePage');
  return (
    <div className="blockss">
      <LanguageSwitcher />
      <h1>{t('Title')}</h1>
      <p>{t('About')}</p>
    </div>
  );
};
export default Page;
