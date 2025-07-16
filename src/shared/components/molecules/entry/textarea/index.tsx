'use client';
import classNames from 'classnames';
import { type ChangeEvent, type KeyboardEvent, useState } from 'react';

import type Props from './type';

const EntryTextarea = ({
  className,
  name = 'textarea',
  value = '',
  disabled = false,
  isAutoHeight,
  placeholder = '',
  maxLength,
  rows = 4,
  handleBlur,
  handleChange,
  handlePressEnter,
}: Props) => {
  const [stateEntryTextarea, setStateEntryTextarea] = useState({ length: value.length || 0 });

  const fnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength) setStateEntryTextarea({ length: e.target.value.length });
    handleChange?.(e.target.value);
  };
  const fnPressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      handlePressEnter?.(e.currentTarget.value);
    } else if (isAutoHeight && e.currentTarget) {
      e.currentTarget.style.height = '5px';
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';
    }
  };

  return (
    <div className={classNames('relative', className)}>
      <textarea
        name={name}
        className={classNames('entry', { disabled: disabled })}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        onBlur={e => handleBlur?.(e.target.value)}
        onChange={e => fnChange(e)}
        onKeyDown={fnPressEnter}
        onKeyUp={fnPressEnter}
      />
      {maxLength && (
        <small className="count-text">
          <strong>{stateEntryTextarea.length}</strong>/{maxLength}
        </small>
      )}
    </div>
  );
};

export default EntryTextarea;
