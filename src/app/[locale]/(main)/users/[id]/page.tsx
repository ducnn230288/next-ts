import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Components from '../.components';
import pageMetadata from './metadata';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const t = await getTranslations('Main/Users');

  return (
    <div className="block">
      <section aria-label={t('EditUser')} className="intro-x card">
        <Components.Form id={id} />
      </section>
    </div>
  );
};
export default Page;
