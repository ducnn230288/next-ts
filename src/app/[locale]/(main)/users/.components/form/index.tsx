'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useRouter } from '@/core/lib/i18n/navigation';
import { sApi } from '@/core/stores';
import { Button } from '@/shared/components/atoms';
import { Form } from '@/shared/components/organisms';
import { C_API, C_LINK } from '@/shared/constants';
import { EStoreApi } from '@/shared/enums';
import type { MUser } from '@/shared/models';
import type { TFormFooter } from '@/shared/types';
import constants from '../../.constants';

const Component = ({ id }: { id?: string }) => {
  const t = useTranslations('Main/Users');
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const navigate = useRouter();
  const textSubmit = !id ? 'Save' : 'Update';
  const renderFooter = ({ formApi }: TFormFooter<MUser>) => (
    <div className="footer-buttons">
      <Button isOutline text={t('BackToList')} handleClick={() => navigate.replace(C_LINK.Users)} />
      {mode !== 'detail' && <Button text={t(textSubmit)} handleClick={formApi.handleSubmit} />}
    </div>
  );

  const user = id
    ? sApi.useItem<MUser>({ url: C_API.Users + id })
    : { data: undefined, isPending: false };

  const handleSuccess = () => navigate.replace(C_LINK.Users);

  const modify = sApi.useModify<MUser, { id: string }>({
    url: C_API.Users,
    valueParam: id,
    keyParam: 'id',
    keyId: 'id',
    handleSuccess,
  });

  const fnSubmit = (value: MUser) => {
    modify.mutate({
      oldData: user.data,
      newData: { id, ...value },
      status: !id ? EStoreApi.Post : EStoreApi.Put,
    });
  };

  return (
    <Form<MUser>
      isEnterSubmit={true}
      isLoading={user.isPending || modify.isPending}
      fields={constants.Forms.USER({ isDisable: mode === 'detail', isEdit: !!id })}
      handleSubmit={({ value }) => fnSubmit(value!)}
      footer={renderFooter}
      translate={t}
      values={user.data}
    />
  );
};

export default Component;
