'use client';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { deleteCookie, setCookie } from '@/app/action';
import { useRouter } from '@/core/lib/i18n/navigation';
import { serviceFetch } from '@/core/services';
import { Button } from '@/shared/components/atoms';
import { Form } from '@/shared/components/organisms';
import { C_API, C_LINK } from '@/shared/constants';
import { ESize } from '@/shared/enums';
import type { TFormFooter } from '@/shared/types';
import constants from '../../.constants';
import type { IRequestLogin } from '../../.interface';

const Component = () => {
  useEffect(() => {
    deleteCookie({ key: 'isLogin' });
  }, []);

  const t = useTranslations('Auth/Login');
  const renderFooter = ({ formApi }: TFormFooter<IRequestLogin>) => (
    <Button text={t('LogIn')} handleClick={() => formApi.handleSubmit()} size={ESize.Large} />
  );

  const navigate = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (values: IRequestLogin) =>
      await serviceFetch.post({ url: C_API.BaseLogin, values, showMessage: false }),
    onSuccess: async () => {
      await setCookie({ key: 'isLogin', value: '1' });
      navigate.replace(C_LINK.Example);
    },
  });

  return (
    <Form<IRequestLogin>
      isEnterSubmit={true}
      isLoading={loginMutation.isPending}
      fields={constants.Forms.LOGIN()}
      handleSubmit={({ value }) => loginMutation.mutate(value!)}
      footer={renderFooter}
      translate={t}
    />
  );
};

export default Component;
