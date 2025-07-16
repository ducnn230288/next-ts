'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { EIcon } from '@/shared/enums';
import Button from '../../atoms/button';
import SvgIcon from '../../atoms/svg-icon';
import './style.scss';

interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  statusCode: 404 | 500;
}

const Component = ({ error, reset, statusCode }: ErrorPageProps) => {
  const t = useTranslations('Components');

  const handleTryAgain = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };
  console.log('Error:', error, statusCode);
  return (
    <section aria-label={t('PageNotFound')} className="page-error-404">
      <div className="box">
        <SvgIcon name={EIcon.Logo} className="h-10" />
        <div className="content">
          <h2>{statusCode}</h2>
          <h2>{statusCode}</h2>
        </div>
        <h3>{t(statusCode === 500 ? 'InternalServerError' : 'PageNotFound')}</h3>
        <div>
          {statusCode === 500 ? (
            <h5>{t('InternalServerErrorMessage')}</h5>
          ) : (
            <>
              <h5>{t('SomeThingMissing')}</h5>
              <h5>{t('ThisPageIsNotAvailable')}</h5>
            </>
          )}
        </div>
        <div className="text-base-300 mt-3">
          <p>{t('SorryWeCantFindThePageYoureLookingFor')}</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/`}>
            <Button text={t('BackToHome')} icon={EIcon.Warning} />
          </Link>
          <Button text={t('ReloadPage')} icon={EIcon.Warning} onClick={handleTryAgain} />
        </div>
      </div>
    </section>
  );
};

export default Component;
