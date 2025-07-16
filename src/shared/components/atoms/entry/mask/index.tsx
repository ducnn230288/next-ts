'use client';
import classNames from 'classnames';
import { useEffect, useImperativeHandle, useRef } from 'react';

import { isNumeric } from '@/shared/utils';
import { Icon } from '../..';
import type Props from './type';

export const EntryMask = <T,>({
  name,
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
  handleBlur,
  handleFocus,
  handleChange,
  handlePressEnter,
  ref,
}: Props<T>) => {
  useImperativeHandle(ref, () => ({ input: input.current }));
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.value = value ?? '';
    }
  }, [value]);

  useEffect(() => {
    setTimeout(
      () =>
        !!mask &&
        !!input.current &&
        IMask(input.current, { mask, normalizeZeros: true, radix: '.' }),
    );
  }, [mask]);
  /**
   * Generates the className for the input element.
   */
  const classInput = classNames('entry', {
    before: !!iconBefore,
    after: !!iconAfter,
    disabled: disabled,
  });
  const fnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNumeric(e.target.value) && parseFloat(e.target.value) === 0) e.target.value = '0';
    handleBlur?.(e);
  };

  return (
    <div className={classNames('relative', className)}>
      {!!iconBefore && (
        <span className="before">
          <Icon name={iconBefore} />
        </span>
      )}
      <input
        name={name}
        ref={input}
        maxLength={maxLength}
        type={type}
        className={classInput}
        disabled={disabled}
        defaultValue={value}
        placeholder={placeholder}
        style={{ height, width }}
        onBlur={fnBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyUp={e => e.key === 'Enter' && handlePressEnter?.(e)}
      />
      {!!iconAfter && (
        <span className="after">
          <Icon name={iconAfter} />
        </span>
      )}
    </div>
  );
};
