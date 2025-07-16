import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import LanguageSwitcher from './.components/LanguageSwitcher';
import pageMetadata from './metadata';
import './style.scss';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata;

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
