'use client';
import classNames from 'classnames';
import { useState } from 'react';

import { EIcon } from '@/shared/enums';
import { getValueChildren, mapChildren } from '@/shared/utils';
import Icon from '../../../atoms/icon';
import Dropdown from '../../dropdown';
import './style.scss';
import type Props from './type';

const EntrySelect = ({
  name = 'select',
  options = [],
  value,
  disabled = false,
  placeholder = '',
  isMultiple,
  handleChange,
  translate,
}: Props) => {
  const [stateEntrySelect, setStateEntrySelect] = useState({ isOpen: false });
  const inlineValue = Array.isArray(value) ? value : [value];
  const listOptions = mapChildren({
    options,
    convert: item => ({
      ...item,
      onClick: () => fnChange(item.value),
      isActive: inlineValue.includes(item.value),
    }),
  });
  const listLabel = value
    ? getValueChildren({
        children: options,
        keyGetValue: 'label',
        value: inlineValue,
      })?.map(e => translate(e))
    : [];

  const fnChange = (optionValue: string | number) => {
    if (isMultiple) {
      if (inlineValue.includes(optionValue)) {
        handleChange?.(inlineValue.filter(v => v !== optionValue) as never);
      } else {
        handleChange?.([...inlineValue, optionValue] as never);
      }
    } else {
      handleChange?.(optionValue);
    }
  };

  return (
    <Dropdown
      options={listOptions}
      translate={translate}
      handleOpen={isOpen => setStateEntrySelect({ isOpen })}
      classContainer="entry-select">
      <input
        name={name}
        className={classNames('entry', { disabled: disabled })}
        placeholder={placeholder}
        value={listLabel?.join(', ') || ''}
        readOnly
      />
      <Icon name={EIcon.Arrow} className={classNames({ open: stateEntrySelect.isOpen })} />
    </Dropdown>
  );
};
export default EntrySelect;
