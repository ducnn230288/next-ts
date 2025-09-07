import { getTranslations } from 'next-intl/server';

import Components from './.components';

const Page = async () => {
  const t = await getTranslations('Auth/Login');
  return (
    <section aria-label={t('Title')} className="intro-x">
      <h1>{t('Title')}</h1>
      <h5>{t('EnterYourDetailsToLoginToYourAccount')}</h5>
      <Components.Form />
    </section>
  );
};

export default Page;
