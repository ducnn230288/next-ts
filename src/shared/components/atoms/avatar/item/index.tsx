import classNames from 'classnames';

import Image from 'next/image';
import utils from '../utils';
import type Props from './type';

const Component = ({ text, src, showName, classSize, index = 0 }: Props) => {
  const styleLetter = {
    color: utils.pickTextColorBasedOnBgColor(utils.getColorByLetter(text as string)),
    backgroundColor: utils.getColorByLetter(text as string),
  };
  const fnGetText = (text: string) => utils.getFirstLetter(text);

  return (
    <div className={'avatar'}>
      {!text || src ? (
        <div className={classNames('shrink-0 ', { '-ml-2': index > 0 })}>
          <Image
            className={classNames(classSize, { 'object-cover': showName })}
            src={src ?? ''}
            alt="Avatar"
          />
        </div>
      ) : (
        <p className={classNames(classSize, { '-ml-2': index > 0 })} style={styleLetter}>
          {fnGetText(text as string).toUpperCase()}
        </p>
      )}
      {!!showName && !!text && <span>{text as string}</span>}
    </div>
  );
};
export default Component;
