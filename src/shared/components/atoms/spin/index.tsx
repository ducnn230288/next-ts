'use client';
import classNames from 'classnames';

import { EIcon, ESize } from '@/shared/enums';
import { useImperativeHandle, useRef } from 'react';
import Icon from '../icon';
import './style.scss';
import type Props from './type';

const Spin = ({ isLoading = true, size, className, children, ref }: Props) => {
  const element = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ element: element.current }));

  return (
    <div className={classNames('spin-container', size, className)} ref={element}>
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
