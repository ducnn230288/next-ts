'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { store } from '@/app/action';
import { useRouter } from '@/core/lib/i18n/navigation';
import { SGlobal, useAppSelector } from '@/core/stores';
import { Button } from '@/shared/components/atoms';
import { Form } from '@/shared/components/organisms';
import { C_LINK } from '@/shared/constants';
import { EFormRuleType, EFormType, ESize, EStatusState } from '@/shared/enums';
import type { TFieldForm, TFormFooter } from '@/shared/types';

interface IRequestLogin {
  username?: string;
  password?: string;
}
const Component = () => {
  const t = useTranslations('Auth/Layout');
  const fields: TFieldForm<IRequestLogin>[] = [
    {
      name: 'username',
      title: 'Username',
      type: EFormType.Text,
      rules: [{ type: EFormRuleType.Required }, { type: EFormRuleType.Email }],
    },
    {
      name: 'password',
      title: 'Password',
      type: EFormType.Password,
      notDefaultValid: true,
      rules: [{ type: EFormRuleType.Required }],
    },
  ];
  const renderFooter = ({ canSubmit, formApi }: TFormFooter<IRequestLogin>) => (
    <Button
      text={t('LogIn')}
      handleClick={() => formApi.handleSubmit()}
      disabled={!canSubmit}
      size={ESize.Large}
    />
  );

  const navigate = useRouter();
  const sGlobal = SGlobal();
  const status = useAppSelector(state => state.status);
  const isLoading = useAppSelector(state => state.isLoading);

  useEffect(() => {
    if (status === EStatusState.IsFulfilled) {
      fnLoginSuccess();
    }
  }, [status]);

  const fnLoginSuccess = async () => {
    await store('data?.token');
    sGlobal.set({ status: EStatusState.Idle });
    navigate.replace(C_LINK.Example);
  };

  return (
    <Form<IRequestLogin>
      isEnterSubmit={true}
      isLoading={isLoading}
      fields={fields}
      handleSubmit={({ value }) => sGlobal.postLogin(value!)}
      footer={renderFooter}
      translate={t}
    />
  );
};

export default Component;
