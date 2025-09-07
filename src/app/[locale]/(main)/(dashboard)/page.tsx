import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import pageMetadata from './metadata';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata;

const Page = async () => {
  const t = await getTranslations('Main/Dashboard');
  return (
    <section aria-label={t('Title')} className="intro-x card">
      {t('Title')}
    </section>
  );
};
export default Page;
