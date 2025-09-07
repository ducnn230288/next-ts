import type { Metadata } from 'next';

import Components from './.components';
import pageMetadata from './metadata';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata;

const Page = async () => {
  return (
    <section aria-label="Example" className="intro-x card">
      <Components.ExampleRowVirtualizer />
      <Components.ExampleDataGrid />
    </section>
  );
};
export default Page;
