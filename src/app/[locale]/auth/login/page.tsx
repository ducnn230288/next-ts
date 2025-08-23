import { getTranslations } from 'next-intl/server';

import Components from './.components';

const Page = async () => {
  const t = await getTranslations('Modules/Auth');
  return (
    <section aria-label={t('SignIn')} className="intro-x">
      <h1>{t('SignIn')}</h1>
      <h5>{t('EnterYourDetailsToLoginToYourAccount')}</h5>
      <Components.Form />
    </section>
  );
};

export default Page;
