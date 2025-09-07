import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Components from '../.components';
import pageMetadata from './metadata';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata;

const Page = async () => {
  const t = await getTranslations('Main/Users');
  return (
    <div className="block">
      <section aria-label={t('NewUser')} className="intro-x card">
        <h1>{t('NewUser')}</h1>
        <Components.Form />
      </section>
    </div>
  );
};
export default Page;
