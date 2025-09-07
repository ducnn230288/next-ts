'use client';
import classNames from 'classnames';
import { useState } from 'react';

import { sApi } from '@/core/store';
import { C_API } from '@/shared/constant';
import { EIcon } from '@/shared/enum';
import { getValueChildren, mapChildren } from '@/shared/util';
import Icon from '../../../atoms/icon';
import Dropdown from '../../dropdown';
import './style.scss';
import type Props from './type';

const EntrySelect = ({
  title = 'Entry Select',
  name = 'select',
  options = [],
  value,
  disabled = false,
  placeholder = '',
  isMultiple,
  handleChange,
  translate,
  isTranslate = true,
  api,
}: Props) => {
  const [stateEntrySelect, setStateEntrySelect] = useState({ isOpen: false });
  const inlineValue = Array.isArray(value) ? value : [value];
  const list = api?.keyApi
    ? sApi.useList<never>({
        enabled: !!api?.keyApi,
        baseUrl: C_API[api.keyApi as keyof typeof C_API],
        key: api?.params ? JSON.stringify(api.params({ full_text: '', value })) : '',
        params: api?.params ? api.params({ full_text: '', value }) : {},
        staleTime: api?.staleTime,
      })
    : null;

  const listOptions = mapChildren({
    options:
      list?.data?.data?.map(item =>
        api?.format
          ? {
              value: item?.[api.format.value],
              label: item?.[api.format.label],
            }
          : item,
      ) || options,
    convert: item => ({
      ...item,
      onClick: () => fnChange(item.value),
      isActive: inlineValue.includes(item.value),
    }),
  });
  const listLabel = value
    ? getValueChildren({
        children: listOptions,
        keyGetValue: 'label',
        value: inlineValue,
      })?.map(e => (isTranslate ? translate(e) : e))
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
      title={title}
      options={listOptions}
      translate={translate}
      handleOpen={isOpen => setStateEntrySelect({ isOpen })}
      isDisabled={disabled}
      isTranslate={isTranslate}
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
