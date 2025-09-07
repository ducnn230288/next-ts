'use client';
import { useQuery } from '@tanstack/react-query';

import { serviceFetch } from '@/core/services';
import { RowVirtualizer, Spin } from '@/shared/components/atoms';
import { C_API } from '@/shared/constants';
import type { MExample } from '@/shared/models';

const ExampleRowVirtualizer = () => {
  const list = useQuery<MExample[]>({
    queryKey: ['example'],
    queryFn: async () => (await serviceFetch.get<MExample[]>({ url: C_API.Example })) as MExample[],
  });

  return (
    <Spin isLoading={list.isPending}>
      <RowVirtualizer<MExample>
        className="h-36"
        data={list.data}
        render={(row, index) => <div key={index}>{row.title}</div>}
      />
    </Spin>
  );
};

export default ExampleRowVirtualizer;
