'use client';
import classNames from 'classnames';
import { useRef } from 'react';

import { mapChildren } from '@/shared/utils';
import Menu from '../../atoms/menu';
import Tooltip from '../../atoms/tooltip';
import type Props from './type';

const Component = ({
  options,
  translate,
  className,
  classContainer,
  isRightClick,
  isWidthFull = true,
  handleOpen,
  handleClick,
  children,
}: Props) => {
  const refTooltip = useRef<{ setOpen: (isOpen: boolean) => void }>(null);

  const listItems = mapChildren({
    options: options,
    convert: item => ({
      ...item,
      onClick: () => {
        refTooltip.current?.setOpen(false);
        handleOpen?.(false);
        item.onClick?.();
      },
    }),
  });

  return (
    <Tooltip
      ref={refTooltip}
      isArrow={false}
      isClick={!isRightClick}
      isRightClick={isRightClick}
      isWidthFull={isWidthFull}
      classContainer={classContainer}
      className={classNames('dropdown', className)}
      handleClick={handleClick}
      handleOpen={handleOpen}
      placement="bottom"
      content={<Menu options={listItems} translate={translate} />}>
      {children}
    </Tooltip>
  );
};

export default Component;
