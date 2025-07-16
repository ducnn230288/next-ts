'use client';
import { useState } from 'react';

import { SvgIcon } from '@/shared/components/atoms';
import { EIcon } from '@/shared/enums';
import type Props from './type';

/**
 * Renders a password input component.
 */
export const EntryPassword = ({ value, placeholder, disabled, onChange, onBlur }: Props) => {
  /**
   * Toggles the visibility of the password input.
   */
  const [stateEntryPassword, setStateEntryPassword] = useState({ isVisible: false });

  return (
    <div className="relative">
      <input
        autoComplete="on"
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        type={!stateEntryPassword.isVisible ? 'password' : 'text'}
        className="entry pr-9"
        onChange={event => onChange?.(event)}
        onBlur={event => onBlur?.(event)}
      />
      <button
        type="button"
        className="icon"
        onClick={() => setStateEntryPassword(old => ({ ...old, isVisible: !old.isVisible }))}>
        <SvgIcon name={!stateEntryPassword.isVisible ? EIcon.EyeSlash : EIcon.Eye} />
      </button>
    </div>
  );
};
