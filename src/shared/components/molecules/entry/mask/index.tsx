'use client';
import classNames from 'classnames';
import IMask, { type InputMask } from 'imask';
import { useImperativeHandle, useRef } from 'react';

import { C_MASK } from '@/shared/constants';
import { isNumeric } from '@/shared/utils';
import Icon from '../../../atoms/icon';
import type Props from './type';

const EntryMask = <T,>({
  name = 'mask',
  className,
  mask,
  value = '',
  iconBefore,
  iconAfter,
  disabled = false,
  placeholder = '',
  height,
  width,
  type = 'text',
  maxLength,
  autoComplete = 'on',
  handleBlur,
  handleFocus,
  handleChange,
  handlePressEnter,
  ref,
}: Props<T>) => {
  const refInput = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({ refInput: refInput.current }));

  const refMasked = useRef<InputMask<never>>(null);
  const fnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNumeric(e.target.value) && parseFloat(e.target.value) === 0) e.target.value = '0';
    handleBlur?.(e.target.value);
    setTimeout(() => {
      if (refMasked.current) refMasked.current.destroy();
    }, 500);
  };

  const fnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    handleFocus?.(e.target.value);

    if (!!mask && !!refInput.current) {
      if (refMasked.current) refMasked.current.destroy();
      refMasked.current = IMask(refInput.current, C_MASK[mask]() as never);
      refMasked.current.on('complete', () => handleChange?.(refMasked.current!.value));
    }
  };

  return (
    <div className={classNames('relative', className)}>
      {!!iconBefore && (
        <span className="before">
          <Icon name={iconBefore} />
        </span>
      )}
      <input
        ref={refInput}
        name={name}
        type={type}
        className={classNames('entry', {
          before: !!iconBefore,
          after: !!iconAfter,
          disabled: disabled,
        })}
        disabled={disabled}
        defaultValue={value}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        style={{ height, width }}
        onBlur={fnBlur}
        onChange={e => handleChange?.(e.target.value)}
        onFocus={fnFocus}
        onKeyUp={e => e.key === 'Enter' && handlePressEnter?.(e.currentTarget.value)}
      />
      {!!iconAfter && (
        <span className="after">
          <Icon name={iconAfter} />
        </span>
      )}
    </div>
  );
};

export default EntryMask;
