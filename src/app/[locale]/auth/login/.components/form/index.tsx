'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { deleteCookie, setCookie } from '@/app/action';
import { useRouter } from '@/core/lib/i18n/navigation';
import { sApi } from '@/core/store';
import { Button } from '@/shared/components/atoms';
import { Form } from '@/shared/components/organisms';
import { C_API, C_LINK, IS_LOGGED_IN } from '@/shared/constant';
import { ESize, EStoreApi } from '@/shared/enum';
import type { TFormFooter } from '@/shared/types';
import constants from '../../.constant';
import type { IRequestLogin } from '../../.interface';

const Component = () => {
  useEffect(() => {
    deleteCookie({ key: IS_LOGGED_IN });
  }, []);

  const t = useTranslations('Auth/Login');
  const renderFooter = ({ formApi }: TFormFooter<IRequestLogin>) => (
    <Button text={t('LogIn')} handleClick={() => formApi.handleSubmit()} size={ESize.Large} />
  );

  const router = useRouter();
  const fnChangePage = (url: string) => router.replace(`${url}`);

  const loginMutation = sApi.useModify<IRequestLogin>({ baseUrl: C_API.UsersLogin });
  const fnSubmitFormUser = (values?: IRequestLogin) => {
    loginMutation.mutate({
      status: EStoreApi.Post,
      isShowMessage: false,
      values,
      handleSuccess: async () => {
        localStorage.setItem(IS_LOGGED_IN, 'true');
        await setCookie({ key: IS_LOGGED_IN, value: '1' });
        fnChangePage(C_LINK.Dashboard);
      },
    });
  };

  return (
    <Form<IRequestLogin>
      isEnterSubmit={true}
      isLoading={loginMutation.isPending}
      fields={constants.Form.LOGIN()}
      handleSubmit={({ value }) => fnSubmitFormUser(value)}
      footer={renderFooter}
      translate={t}
    />
  );
};

export default Component;
