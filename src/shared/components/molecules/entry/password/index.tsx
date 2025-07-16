'use client';
import { useState } from 'react';

import { EIcon } from '@/shared/enums';
import Icon from '../../../atoms/icon';
import type Props from './type';

/**
 * Renders a password input component.
 */
const EntryPassword = ({ name, value, placeholder, disabled, handleChange, handleBlur }: Props) => {
  const [stateEntryPassword, setStateEntryPassword] = useState({ isVisible: false });
  const fnToggleVisible = () =>
    setStateEntryPassword(old => ({ ...old, isVisible: !old.isVisible }));

  return (
    <div className="relative">
      <input
        className="entry pr-9"
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        type={!stateEntryPassword.isVisible ? 'password' : 'text'}
        onChange={event => handleChange?.(event.target.value)}
        onBlur={event => handleBlur?.(event.target.value)}
        autoComplete="on"
      />
      <button className="icon" onClick={fnToggleVisible} type="button">
        <Icon name={!stateEntryPassword.isVisible ? EIcon.EyeSlash : EIcon.Eye} />
      </button>
    </div>
  );
};

export default EntryPassword;
