import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Components from '../.components';
import pageMetadata from './metadata';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata;

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode: string | null }>;
}) => {
  const { id } = await params;
  const t = await getTranslations('Main/User');
  const mode = (await searchParams).mode;

  return (
    <div className="block">
      <section aria-label={t(mode === 'detail' ? 'ViewUser' : 'EditUser')} className="intro-x card">
        <h1>{t(mode === 'detail' ? 'ViewUser' : 'EditUser')}</h1>
        <Components.Form id={id} />
      </section>
    </div>
  );
};
export default Page;
