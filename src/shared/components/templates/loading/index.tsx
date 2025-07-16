import { useTranslations } from 'next-intl';

import Spin from '../../atoms/spin';
import './style.scss';

const Component = () => {
  const t = useTranslations('Components');
  const waviyLength = t('LoadingPage').length / 10 + 0.3 + 's';
  const chars = t('LoadingPage').split('');

  return (
    <section className="template-loading" aria-label={t('LoadingPage')}>
      <Spin />
      <p
        style={
          { '--waviy-length': waviyLength } as {
            [key: string]: React.CSSProperties;
          }
        }>
        {chars.map((text, index) => (
          <span
            key={index + text}
            style={
              { '--waviy-i': index + 1 } as {
                [key: string]: React.CSSProperties;
              }
            }
            dangerouslySetInnerHTML={{ __html: text !== ' ' ? text : '&nbsp;' }}></span>
        ))}
      </p>
    </section>
  );
};

export default Component;
