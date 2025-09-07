'use client';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { EIcon } from '@/shared/enums';
import Icon from '../../atoms/icon';
import EntryMask from '../entry/mask';
import './style.scss';
import type Props from './type';

const Search = ({ className, value, handleChange }: Props) => {
  const t = useTranslations('Components');
  useEffect(() => {
    setStateSearch(old => ({ ...old, value }));
  }, [value]);

  const [stateSearch, setStateSearch] = useState({ value });
  const refEntryMask = useRef<{ refInput: HTMLInputElement }>(null);
  const fnPressEnter = () => {
    const value = refEntryMask.current?.refInput?.value.trim();
    handleChange(value);
    setStateSearch(old => ({ ...old, value }));
  };

  const timeoutSearch = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fnChange = () => {
    if (timeoutSearch.current) clearTimeout(timeoutSearch.current);
    timeoutSearch.current = setTimeout(() => fnPressEnter(), 500);
  };

  const fnClick = () => {
    if (stateSearch.value) {
      setStateSearch(old => ({ ...old, value: undefined }));
      handleChange(undefined);
    } else {
      fnPressEnter();
    }
  };

  return (
    <div className={classNames('search', className)}>
      <EntryMask
        name={'search'}
        ref={refEntryMask}
        value={stateSearch.value}
        placeholder={t('Search')}
        handleChange={fnChange}
        handlePressEnter={fnPressEnter}
      />
      <button onClick={fnClick}>
        <Icon name={stateSearch.value ? EIcon.Close : EIcon.Search} />
      </button>
    </div>
  );
};

export default Search;
