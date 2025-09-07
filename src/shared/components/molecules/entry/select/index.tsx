'use client';
import classNames from 'classnames';
import { useState } from 'react';

import { sApi } from '@/core/stores';
import { C_API } from '@/shared/constants';
import { EIcon } from '@/shared/enums';
import { getValueChildren, mapChildren } from '@/shared/utils';
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
  api,
}: Props) => {
  const [stateEntrySelect, setStateEntrySelect] = useState({ isOpen: false });
  const inlineValue = Array.isArray(value) ? value : [value];
  const list =
    api?.keyApi &&
    sApi.useList<{ data: never[]; total: number; page: number; page_size: number }, { id: string }>(
      {
        url: C_API[api.keyApi],
        valueParam: '1',
        keyParam: 'page',
        params: api?.params ? api.params({ fullTextSearch: '', value }) : {},
        staleTime: api?.staleTime || 24 * 60 * 60 * 1000,
      },
    );

  const listOptions = mapChildren({
    options: list?.data?.data?.map(item => (api?.format ? api.format(item) : item)) || options,
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
      title={title}
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
