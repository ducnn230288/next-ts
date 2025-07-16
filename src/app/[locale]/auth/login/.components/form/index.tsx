'use client';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { translate } from '@/app/provider';
import { serviceMessage } from '@/core/services';
import { Button } from '@/shared/components/atoms';
import { Form } from '@/shared/components/organisms';
import { EFormRuleType, EFormType, ESize } from '@/shared/enums';
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

  const [stateForm, setStateForm] = useState({ isLoading: false });
  const fnLogin = async (values: IRequestLogin) => {
    setStateForm({ isLoading: true });
    const result = await signIn('credentials', {
      email: values.username,
      password: values.password,
      redirect: false,
    });
    setStateForm({ isLoading: false });
    if (result?.error) {
      serviceMessage.error({ content: translate('CredentialsSignin') });
    } else {
      window.location.href = result?.url ?? '/';
    }
  };
  return (
    <Form<IRequestLogin>
      isEnterSubmit={true}
      isLoading={stateForm.isLoading}
      fields={fields}
      handleSubmit={({ value }) => fnLogin(value!)}
      footer={renderFooter}
      translate={t}
    />
  );
};

export default Component;
