'use client';
import classNames from 'classnames';
import { useRef } from 'react';

import { EPlacement } from '@/shared/enum';
import { mapChildren } from '@/shared/util';
import Menu from '../../atoms/menu';
import Tooltip from '../../atoms/tooltip';
import type Props from './type';

const Component = ({
  title = 'Dropdown',
  options,
  translate,
  className,
  classContainer,
  isRightClick,
  isWidthFull = true,
  handleOpen,
  handleClick,
  placement = EPlacement.Bottom,
  isDisabled,
  isTranslate = true,
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
      title={title}
      ref={refTooltip}
      isArrow={false}
      isClick={!isRightClick}
      isRightClick={isRightClick}
      isWidthFull={isWidthFull}
      classContainer={classContainer}
      className={classNames('dropdown', className)}
      handleClick={handleClick}
      handleOpen={handleOpen}
      placement={placement}
      isDisabled={isDisabled}
      content={<Menu options={listItems} translate={translate} isTranslate={isTranslate} />}>
      {children}
    </Tooltip>
  );
};

export default Component;
