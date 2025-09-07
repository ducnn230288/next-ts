'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useRouter } from '@/core/lib/i18n/navigation';
import { sApi } from '@/core/store';
import { Button } from '@/shared/components/atoms';
import { Form } from '@/shared/components/organisms';
import { C_API, C_LINK } from '@/shared/constant';
import { EStoreApi } from '@/shared/enum';
import type { MUser } from '@/shared/model';
import type { TFormFooter } from '@/shared/types';
import constants from '../../.constant';

const Component = ({ id }: { id?: string }) => {
  const t = useTranslations('Main/User');

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const router = useRouter();
  const fnChangePage = (url: string) => router.replace(`${url}`);

  const queryUser = sApi.useItem<MUser>({ enabled: !!id, baseUrl: C_API.Users + id, key: id });
  const userMutation = sApi.useModify<MUser>({ baseUrl: C_API.Users, key: id });

  const fnSubmitFormUser = (values?: MUser) => {
    userMutation.mutate({
      status: !id ? EStoreApi.Post : EStoreApi.Put,
      url: !id ? '' : id,
      values,
      handleSuccess: () => fnChangePage(C_LINK.User),
    });
  };

  const userFields = constants.Form.USER({ isDisable: mode === 'detail', isEdit: !!id });

  const textSubmit = !id ? 'Save' : 'Update';
  const renderFooter = ({ formApi }: TFormFooter<MUser>) => (
    <div className="footer-buttons">
      <Button isOutline text={t('BackToList')} handleClick={() => fnChangePage(C_LINK.User)} />
      {mode !== 'detail' && <Button text={t(textSubmit)} handleClick={formApi.handleSubmit} />}
    </div>
  );

  return (
    <Form<MUser>
      isEnterSubmit={true}
      isLoading={(!!id && queryUser.isPending) || userMutation.isPending}
      fields={userFields}
      handleSubmit={({ value }) => fnSubmitFormUser(value)}
      footer={renderFooter}
      translate={t}
      values={queryUser.data}
    />
  );
};

export default Component;
