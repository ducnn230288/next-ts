'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { EIcon } from '@/shared/enums';
import Button from '../../atoms/button';
import Icon from '../../atoms/icon';
import './style.scss';

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
  statusCode: 404 | 500;
}

const Component = ({ error, reset, statusCode }: ErrorPageProps) => {
  const t = useTranslations();

  const fnTryAgain = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  const param = JSON.parse(error?.name ?? '{}');

  return (
    <section aria-label={t('Components.PageNotFound')} className="page-error-404">
      <div className="box">
        <Icon name={EIcon.Logo} className="h-10" />
        <div className="content">
          <h2>{param.statusCode ?? statusCode}</h2>
          <h2>{param.statusCode ?? statusCode}</h2>
        </div>
        <h3>
          {t(statusCode === 500 ? 'Components.InternalServerError' : 'Components.PageNotFound')}
        </h3>
        <div>
          {statusCode === 500 ? (
            <h5>{t(error?.message ?? '', param)}</h5>
          ) : (
            <>
              <h5>{t('Components.SomeThingMissing')}</h5>
              <h5>{t('Components.ThisPageIsNotAvailable')}</h5>
            </>
          )}
        </div>
        <div className="text-base-300 mt-3">
          <p>{t('Components.SorryWeCantFindThePageYoureLookingFor')}</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/`}>
            <Button text={t('Components.BackToHome')} icon={EIcon.Warning} />
          </Link>
          <Button text={t('ReloadPage')} icon={EIcon.Warning} handleClick={fnTryAgain} />
        </div>
      </div>
    </section>
  );
};

export default Component;
