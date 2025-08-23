import type { Metadata } from 'next';

import Components from './.components';
import pageMetadata from './metadata';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata;

const Page = async () => {
  return (
    <section aria-label="Example" className="bg-base-0 px-6 py-5 mt-5 rounded-2xl">
      <Components.ExampleRowVirtualizer />
      <Components.ExampleDataGrid />
    </section>
  );
};
export default Page;
