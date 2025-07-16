'use client';
import type { Table } from '@tanstack/react-table';
import { useRef, useState } from 'react';

import { sApi } from '@/core/stores';
import { Button, Tooltip } from '@/shared/components/atoms';
import { Search } from '@/shared/components/molecules';
import { DataGrid, FormModal } from '@/shared/components/organisms';
import { C_API } from '@/shared/constants';
import type { MExample } from '@/shared/models';
import type { TForm } from '@/shared/types';
import constants from '../../.constants';

const ExampleDataGrid = () => {
  const [stateExample, setStateExample] = useState({ isVisible: false });
  const list = sApi.useList<MExample, { id: string }>({
    url: C_API.Example,
    valueParam: '',
    keyParam: 'id',
  });

  const refTable = useRef<Table<MExample> | undefined>(undefined);
  const fnOpenModal = () => {
    setStateExample(old => ({ ...old, isVisible: true }));
  };
  const fnCloseModal = () => {
    setStateExample(old => ({ ...old, isVisible: false }));
  };
  const fnSubmit = ({ value }: { value?: MExample; formApi: TForm<MExample> }) => {
    console.log(value);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Tooltip content={'Open form modal'}>
          <Button text={'Form modal'} handleClick={fnOpenModal} />
        </Tooltip>
        <Search handleChange={value => refTable.current?.setGlobalFilter(value)} />
      </div>
      <FormModal<MExample>
        className="w-2xl"
        fields={constants.Forms.EXAMPLE()}
        title={'Form Example'}
        handleSubmit={fnSubmit}
        isOpen={stateExample.isVisible}
        handleCancel={fnCloseModal}
        translate={t => t}
      />
      <DataGrid<MExample>
        filterGlobal={(row, columnId, value) => {
          return (
            !value ||
            (['id', 'albumId', 'title', 'url', 'thumbnailUrl', 'date'].includes(columnId) &&
              (row.original[columnId as keyof MExample] as string)?.includes(value))
          );
        }}
        ref={refTable}
        isLoading={list.isPending}
        columns={constants.Tables.EXAMPLE()}
        data={list.data}
        keyId="hidden"
        className="max-h-[calc(100vh-22.5rem)]"
        body={{
          checkbox: {
            handleChange: ids => console.log(ids),
            width: 44,
            isAsynchronous: true,
          },
        }}
        translate={t => t}
        pagination={{}}
      />
    </>
  );
};

export default ExampleDataGrid;
