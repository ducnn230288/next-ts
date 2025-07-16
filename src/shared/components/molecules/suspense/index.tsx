import { Suspense } from 'react';

import { Spin } from '../../atoms';

const Component = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Spin />}>
      <div>{children}</div>
    </Suspense>
  );
};

export default Component;
