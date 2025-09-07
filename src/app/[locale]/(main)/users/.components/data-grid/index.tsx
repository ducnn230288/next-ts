'use client';
import { Link, useRouter } from '@/core/lib/i18n/navigation';
import type { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { sApi, useAppSelector } from '@/core/stores';
import { Button } from '@/shared/components/atoms';
import { Search } from '@/shared/components/molecules';
import { DataGrid } from '@/shared/components/organisms';
import { C_API, C_LINK } from '@/shared/constants';
import { EPermissions, EStoreApi } from '@/shared/enums';
import type { MUser } from '@/shared/models';
import { checkPermission } from '@/shared/utils/check-permission';
import constants from '../../.constants';

const Component = () => {
  const list = sApi.useList<MUser, { id: string }>({
    url: C_API.Users,
    valueParam: '',
    keyParam: 'id',
  });

  const modify = sApi.useModify<MUser, { id: string }>({
    url: C_API.Users,
    valueParam: '',
    keyParam: 'id',
    keyId: 'id',
  });

  const router = useRouter();
  const t = useTranslations('Main/Users');
  const refTable = useRef<Table<MUser> | undefined>(undefined);
  const user = useAppSelector(state => state.user);

  return (
    <>
      <div className="flex items-center justify-between">
        <Search handleChange={value => refTable.current?.setGlobalFilter(value)} />
        {checkPermission(user, EPermissions.USER_CREATE) && (
          <Link href={C_LINK.UsersNew}>
            <Button text={t('NewUser')} />
          </Link>
        )}
      </div>
      <DataGrid<MUser>
        filterGlobal={(row, columnId, value) => {
          return (
            !value ||
            (['username', 'email'].includes(columnId) &&
              (row.original[columnId as keyof MUser] as string)?.includes(value))
          );
        }}
        ref={refTable}
        isLoading={list.isPending || modify.isPending}
        columns={constants.Tables.USER()}
        data={list.data?.data || []}
        keyId="id"
        className="max-h-[calc(100vh-13.5rem)]"
        body={{
          checkbox: {
            handleChange: ids => console.log(ids),
            width: 44,
            isAsynchronous: true,
          },
        }}
        translate={t}
        pagination={{}}
        action={{
          label: t('User'),
          name: data => data.username,
          onDetail: checkPermission(user, EPermissions.USER_VIEW_DETAIL)
            ? data => router.push(`${C_LINK.Users}/${data.id}?mode=detail`)
            : undefined,
          onEdit: checkPermission(user, EPermissions.USER_UPDATE)
            ? data => router.push(`${C_LINK.Users}/${data.id}`)
            : undefined,
          onDelete: checkPermission(user, EPermissions.USER_DELETE)
            ? data => modify.mutate({ oldData: data, status: EStoreApi.Delete })
            : undefined,
        }}
      />
    </>
  );
};

export default Component;
