import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Components from './.components';
import pageMetadata from './metadata';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata;

const Page = async () => {
  const t = await getTranslations('Main/Users');

  return (
    <section aria-label={t('Title')} className="intro-x card">
      <Components.DataGrid />
    </section>
  );
};
export default Page;
