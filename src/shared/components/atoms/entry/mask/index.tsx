'use client';
import classNames from 'classnames';
import { useEffect, useImperativeHandle, useRef } from 'react';

import { isNumeric } from '@/shared/utils';
import type Props from './type';

export const EntryMask = <T,>({
  name,
  className,
  mask,
  value = '',
  formApi,
  addonBefore,
  addonAfter,
  disabled,
  placeholder = '',
  height,
  width,
  type,
  maxLength,
  onBlur,
  onFocus,
  onChange,
  onPressEnter,
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
    before: !!addonBefore,
    after: !!addonAfter,
    disabled: disabled,
  });
  const fnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNumeric(e.target.value) && parseFloat(e.target.value) === 0) e.target.value = '0';
    onBlur?.(e);
  };

  return (
    <div className={classNames('relative', className)}>
      {!!addonBefore && <span className="before">{addonBefore(formApi)}</span>}
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
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={e => e.key === 'Enter' && onPressEnter?.(e)}
      />
      {!!addonAfter && <span className="after">{addonAfter(formApi)}</span>}
    </div>
  );
};
