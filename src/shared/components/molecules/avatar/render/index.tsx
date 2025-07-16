import classNames from 'classnames';

import Image from 'next/image';
import utils from '../utils';
import type Props from './type';

const Component = ({ text, src, showName, size, index = 0 }: Props) => {
  /**
   * Renders an avatar image.
   */
  const renderImage = () => (
    <div className={classNames('shrink-0 ', { '-ml-2': index > 0 })}>
      <Image
        alt="Avatar"
        style={{ height: size, width: size }}
        className={classNames({
          'object-contain': !showName,
          'object-cover': showName,
        })}
        src={src ?? ''}
      />
    </div>
  );
  const getText = (text: string) => utils.getFirstLetter(text);
  /**
   * Renders an avatar letter.
   */
  const renderLetter = () => (
    <p
      className={classNames({ '-ml-2': index > 0 })}
      style={{
        color: utils.pickTextColorBasedOnBgColor(utils.getColorByLetter(text as string)),
        backgroundColor: utils.getColorByLetter(text as string),
        height: size + 'px',
        width: size + 'px',
      }}>
      {getText(text as string).toUpperCase()}
    </p>
  );
  return (
    <div className={'avatar'}>
      {!text || src ? renderImage() : renderLetter()}
      {!!showName && !!text && <span>{text as string}</span>}
    </div>
  );
};
export default Component;
