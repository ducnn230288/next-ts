'use client';
import { sApi } from '@/core/stores';
import { RowVirtualizer, Spin } from '@/shared/components/atoms';
import { C_API } from '@/shared/constants';
import type { MExample } from '@/shared/models';

const ExampleRowVirtualizer = () => {
  const list = sApi.useList<MExample, { id: string }>({
    url: C_API.Example,
    valueParam: '',
    keyParam: 'id',
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
