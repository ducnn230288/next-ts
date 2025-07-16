import { getTranslations } from 'next-intl/server';

import { serverErrorHandler } from '@/app/action';
import Components from './.components';

const Page = async () => {
  return serverErrorHandler(async () => {
    const t = await getTranslations('Auth/Layout');
    return (
      <section aria-label={t('SignIn')} className="intro-x">
        <h1>{t('SignIn')}</h1>
        <h5>{t('EnterYourDetailsToLoginToYourAccount')}</h5>
        <Components.Form />
      </section>
    );
  });
};

export default Page;
