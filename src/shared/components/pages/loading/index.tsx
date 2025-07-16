import { useTranslations } from 'next-intl';

import Spin from '../../atoms/spin';
import './style.scss';

const Component = () => {
  const t = useTranslations('Components');

  return (
    <section aria-label={t('LoadingPage')} className="page-loading">
      <Spin />
      <p
        style={
          { '--waviy-length': t('LoadingPage').length / 10 + 0.3 + 's' } as {
            [key: string]: React.CSSProperties;
          }
        }>
        {t('LoadingPage')
          .split('')
          .map((text, index) => (
            <span
              key={index + text}
              style={
                { '--waviy-i': index + 1 } as {
                  [key: string]: React.CSSProperties;
                }
              }
              dangerouslySetInnerHTML={{
                __html: text !== ' ' ? text : '&nbsp;',
              }}></span>
          ))}
      </p>
    </section>
  );
};

export default Component;
