import classNames from 'classnames';

import { EIcon, ESize } from '@/shared/enums';
import { Icon } from '..';
import './style.scss';
import type Props from './type';

const Spin = ({ isLoading = true, children, size }: Props) => {
  return (
    <div className={classNames('spin-container', size)}>
      {isLoading && (
        <div className="overlay">
          <div className="spin-loading"></div>
          {size !== ESize.Small && <Icon name={EIcon.Logo} className="size-6" />}
        </div>
      )}
      {children}
    </div>
  );
};

export default Spin;
