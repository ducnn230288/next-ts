'use client';
import type { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { useRouter } from '@/core/lib/i18n/navigation';
import { sApi, useAppSelector } from '@/core/store';
import { Button } from '@/shared/components/atoms';
import { Search } from '@/shared/components/molecules';
import { DataGrid, FormModal } from '@/shared/components/organisms';
import { C_API, C_LINK } from '@/shared/constant';
import { EIcon, EPermissions, EStoreApi } from '@/shared/enum';
import type { MUser } from '@/shared/model';
import type { TTableAction, TTableBody, TTablePagination } from '@/shared/types';
import { checkPermission } from '@/shared/util';
import constants from '../../.constant';

const Component = () => {
  const t = useTranslations('Main/User');

  const [stateUser, setStateUser] = useState<{
    isOpenChangePassword?: boolean;
    userId?: string;
    params?: Record<string, unknown>;
  }>({
    isOpenChangePassword: false,
    params: { page: 1 },
  });
  const userListQuery = sApi.useList<MUser>({
    baseUrl: C_API.Users,
    key: stateUser.params,
    params: stateUser.params,
    enabled: stateUser.params?.page_size !== undefined,
  });
  const user = useAppSelector(state => state.user);
  useEffect(() => {
    if (stateUser.params?.page_size === undefined && refTableUser.current.pageSize !== undefined) {
      setTimeout(() => {
        setStateUser(old => ({
          ...old,
          params: { ...old.params, page_size: refTableUser.current.pageSize },
        }));
      }, 500);
    }
  }, [user]);
  const userList = userListQuery.data?.data || [];
  const userPagination: TTablePagination = {
    total: userListQuery.data?.total,
    page_size: userListQuery.data?.page_size,
    page: userListQuery.data?.page,
    handleChange: pagination =>
      setStateUser(old => ({ ...old, params: { ...old.params, ...pagination } })),
  };
  const fnUserSort = (sort: string[]) => {
    setStateUser(old => ({ ...old, params: { ...old.params, sort } }));
  };

  const userMutation = sApi.useModify<MUser>({ baseUrl: C_API.Users });

  const fnCloseChangePasswordModal = () => {
    setStateUser(old => ({ ...old, isOpenChangePassword: false, userId: undefined }));
  };
  const fnChangePassword = (values?: Pick<MUser, 'password'>) => {
    userMutation.mutate({
      values,
      status: EStoreApi.Put,
      url: stateUser.userId + '/change-password',
      handleSuccess: fnCloseChangePasswordModal,
    });
  };

  const router = useRouter();
  const fnChangePage = (url: string, query?: Record<string, string>) => {
    const params = query ? `?${new URLSearchParams(query)}` : '';
    router.push(`${url}${params}`);
  };

  const isCanCreateUser = checkPermission({ user, permission: EPermissions.USER_CREATE });

  const refTableUser = useRef<{ table?: Table<MUser>; pageSize?: number }>({});
  const fnSearchUser = (full_text?: string) => {
    setStateUser(old => ({ ...old, params: { ...old.params, full_text, page: 1 } }));
  };

  const changePasswordFields = constants.Form.USER({ isChangePassword: true }).filter(
    f => f.name === 'password',
  );
  const userDataColumns = constants.Table.USER();
  const userTableBody: TTableBody = {
    checkbox: {
      // handleChange: ids => console.log(ids),
      width: 44,
      isAsynchronous: true,
    },
  };
  const userTableAction: TTableAction<MUser> = {
    label: t('User'),
    name: data => data.username,
    onDetail: checkPermission({ user, permission: EPermissions.USER_VIEW_DETAIL })
      ? data => fnChangePage(`${C_LINK.User}/${data.id}`, { mode: 'detail' })
      : undefined,
    onEdit: checkPermission({ user, permission: EPermissions.USER_UPDATE })
      ? data => fnChangePage(`${C_LINK.User}/${data.id}`)
      : undefined,
    onDelete: checkPermission({ user, permission: EPermissions.USER_DELETE })
      ? data => userMutation.mutate({ status: EStoreApi.Delete, url: data.id! })
      : undefined,
    renderMore: checkPermission({ user, permission: EPermissions.USER_CHANGE_PASSWORD })
      ? data => [
          {
            label: 'ChangePassword',
            value: 'change-password',
            icon: EIcon.ChangePassword,
            onClick: () =>
              setStateUser(old => ({ ...old, isOpenChangePassword: true, userId: data.id })),
          },
        ]
      : undefined,
  };

  return (
    user && (
      <>
        <FormModal<Pick<MUser, 'password'>>
          fields={changePasswordFields}
          title={t('ChangePassword')}
          isOpen={stateUser.isOpenChangePassword}
          isLoading={userMutation.isPending}
          translate={t => t}
          handleSubmit={({ value }) => fnChangePassword(value)}
          handleCancel={fnCloseChangePasswordModal}
        />
        <div className="flex items-center justify-between">
          <Search handleChange={fnSearchUser} />
          {isCanCreateUser && (
            <Button
              icon={EIcon.Plus}
              text={t('NewUser')}
              handleClick={() => fnChangePage(`${C_LINK.UserNew}`)}
            />
          )}
        </div>
        <DataGrid<MUser>
          isLoading={userListQuery.isFetching || userMutation.isPending}
          columns={userDataColumns}
          data={userList}
          body={userTableBody}
          translate={t}
          handleSort={fnUserSort}
          pagination={userPagination}
          action={userTableAction}
          ref={refTableUser}
          keyId="id"
          className="max-h-[calc(100vh-13.5rem)]"
        />
      </>
    )
  );
};

export default Component;
