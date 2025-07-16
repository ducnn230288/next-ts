import type { FilterFns } from '@tanstack/react-table';
import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { EIcon, ETableFilterType } from '@/shared/enums';
import Button from '../../../../../atoms/button';
import Icon from '../../../../../atoms/icon';
import Tooltip from '../../../../../atoms/tooltip';
import EntryDate from '../../../../../molecules/entry/date';
import EntryMask from '../../../../../molecules/entry/mask';
import EntrySelect from '../../../../../molecules/entry/select';
import ETypeFilter from './enum';
import type Props from './type';

const Component = <TData,>({ column, refFilterTypeCurrent }: Props<TData>) => {
  const t = useTranslations('Components');
  const typeFilter = {
    text: [
      { value: ETypeFilter.IncludeText, label: 'IncludeInputBelow' },
      { value: ETypeFilter.NotIncludeText, label: 'DoNotIncludeInputBelow' },
      { value: ETypeFilter.StartText, label: 'StartWithInputBelow' },
      { value: ETypeFilter.EndText, label: 'EndWithInputBelow' },
      { value: ETypeFilter.SameText, label: 'SameWithInputBelow' },
    ],
    date: [
      { value: ETypeFilter.SameDate, label: 'DateMakeSame' },
      { value: ETypeFilter.BeforeDate, label: 'DayBeforeInputBelow' },
      { value: ETypeFilter.AfterDate, label: 'DayAfterInputBelow' },
    ],
    number: [
      { value: ETypeFilter.GreaterNumber, label: 'GreaterThanInputBelow' },
      { value: ETypeFilter.GreaterEqualNumber, label: 'GreaterThanOrEqualTo' },
      { value: ETypeFilter.LessNumber, label: 'SmallerThanInputBelow' },
      { value: ETypeFilter.LessEqualNumber, label: 'SmallerThanOrEqualTo' },
      { value: ETypeFilter.EqualNumber, label: 'EqualToBelow' },
      { value: ETypeFilter.NotEqualNumber, label: 'NotEqualToBelow' },
      { value: ETypeFilter.MiddleNumber, label: 'InTheMiddleOfInputBelow' },
      { value: ETypeFilter.NotMiddleNumber, label: 'NotInTheMiddleOfInputBelow' },
    ],
  };

  const [stateFilter, setStateFilter] = useState<{
    value?: unknown;
    isOpen?: boolean;
    error?: boolean;
  }>({
    value: refFilterTypeCurrent.current[column.id],
    isOpen: false,
    error: false,
  });
  const columnFilterValue = column.getFilterValue();
  const refValue = useRef(
    typeof columnFilterValue === 'string'
      ? (columnFilterValue?.toString() ?? '')
      : ((columnFilterValue as [number, number])?.[0]?.toString() ?? ''),
  );
  const refValueEnd = useRef(
    typeof columnFilterValue === 'object'
      ? (columnFilterValue as [number, number])?.[1]?.toString()
      : '',
  );
  const refValueDate = useRef(columnFilterValue);

  const handleReset = () => {
    delete refFilterTypeCurrent.current[column.id];
    column.columnDef.filterFn = undefined;
    column.setFilterValue(undefined);
    setStateFilter({ error: false, isOpen: false, value: refFilterTypeCurrent.current[column.id] });
  };

  const handleSubmit = () => {
    let value: unknown = refValue.current ?? null;
    let isOpen = true;
    if (stateFilter.value) {
      refFilterTypeCurrent.current[column.id] = stateFilter.value as keyof FilterFns;
      if (
        stateFilter.value === ETypeFilter.MiddleNumber ||
        stateFilter.value === ETypeFilter.NotMiddleNumber
      ) {
        value =
          refValue.current && refValueEnd.current ? [refValue.current, refValueEnd.current] : null;
      } else if (column.columnDef.meta?.filter === ETableFilterType.Date)
        value = refValueDate.current ?? null;
      if (stateFilter.value === ETypeFilter.Blank || stateFilter.value === ETypeFilter.NotBlank) {
        column.columnDef.filterFn = stateFilter.value;
        column.setFilterValue(null);
        isOpen = false;
      } else if (value) {
        column.columnDef.filterFn = stateFilter.value as keyof FilterFns;
        column.setFilterValue(value);
        isOpen = false;
      }
    }
    setStateFilter({
      error: isOpen,
      isOpen,
      value: refFilterTypeCurrent.current[column.id],
    });
  };

  // set value when input field change.
  const handleOnChangeValue = (value: string) => {
    if ((value && stateFilter.error) || (!value && !stateFilter.error)) {
      setStateFilter(old => ({ ...old, error: !old.error }));
    }
    refValue.current = value;
  };

  // set value when range number field change.
  const handleOnChangeValueEnd = (value: string) => {
    refValueEnd.current = value;
    if ((value && stateFilter.error) || (!value && !stateFilter.error)) {
      setStateFilter(old => ({ ...old, error: !old.error }));
    }
  };

  // set value when date pick field change.
  const handleOnChangeValueDate = (e: Dayjs) => {
    refValueDate.current = e;
    if ((e && stateFilter.error) || (!e && !stateFilter.error)) {
      setStateFilter(old => ({ ...old, error: !old.error }));
    }
  };
  const handleOnChangeSelect = (value: unknown) => {
    const error =
      value === ETypeFilter.Blank || value === ETypeFilter.NotBlank ? false : stateFilter.error;
    setStateFilter(old => ({ ...old, error, value }));
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      refValue.current =
        typeof columnFilterValue === 'string'
          ? (columnFilterValue?.toString() ?? '')
          : ((columnFilterValue as [number, number])?.[0]?.toString() ?? '');
      refValueEnd.current =
        typeof columnFilterValue === 'object'
          ? (columnFilterValue as [number, number])?.[1]?.toString()
          : '';
      refValueDate.current = columnFilterValue;
    }
    setStateFilter(old => ({
      ...old,
      isOpen,
      value: column.columnDef.filterFn === 'auto' ? null : column.columnDef.filterFn,
      error: !isOpen && stateFilter.error ? false : old.error,
    }));
  };

  return (
    column?.columnDef?.meta?.filter && (
      <Tooltip
        className="dropdown"
        isClick
        isArrow={false}
        isOpen={stateFilter.isOpen}
        handleOpen={handleOpenChange}
        content={
          <div
            className={classNames('data-grid-filter', {
              'w-56': column?.columnDef?.meta?.filter === ETableFilterType.Text,
              'w-52': column?.columnDef?.meta?.filter !== ETableFilterType.Text,
            })}>
            <p>{t('ColumnName')}</p>
            <EntryMask
              name="colunm-name"
              disabled={true}
              value={(column?.columnDef?.header as string) ?? ''}
            />
            <div className="title">
              <hr />
              <strong>{t('ConditionSetting')}</strong>
            </div>
            <p>
              {t('Condition')} ({t(column.columnDef.meta?.filter as string)})
            </p>
            {column.columnDef.meta?.filter && (
              <EntrySelect
                handleChange={handleOnChangeSelect}
                value={stateFilter.value as never}
                options={[
                  ...typeFilter[column.columnDef.meta.filter as keyof typeof typeFilter],
                  { value: ETypeFilter.Blank, label: t('Blank') },
                  { value: ETypeFilter.NotBlank, label: t('NotBlank') },
                ]}
                translate={t}
              />
            )}

            <p>{t('Value')}</p>
            {column.columnDef.meta.filter !== ETableFilterType.Date && (
              <EntryMask
                name="filter"
                mask={
                  column.columnDef.meta?.filter === ETableFilterType.Number ? 'number' : undefined
                }
                disabled={
                  !stateFilter.value ||
                  stateFilter.value === ETypeFilter.Blank ||
                  stateFilter.value === ETypeFilter.NotBlank
                }
                value={refValue.current}
                placeholder={
                  column.columnDef.meta?.filter !== ETableFilterType.Number
                    ? `${t('Search')}... (${column.getFacetedUniqueValues().size})`
                    : `${t('Min')} (${column.getFacetedMinMaxValues()?.[0] ?? ''})`
                }
                handleBlur={handleOnChangeValue}
              />
            )}
            {(stateFilter.value === ETypeFilter.MiddleNumber ||
              stateFilter.value === ETypeFilter.NotMiddleNumber) && (
              <EntryMask
                name="filter-number"
                mask={
                  column.columnDef.meta?.filter === ETableFilterType.Number ? 'number' : undefined
                }
                placeholder={`${t('Max')} (${column.getFacetedMinMaxValues()?.[1] ?? ''})`}
                value={refValueEnd.current}
                handleBlur={handleOnChangeValueEnd}
              />
            )}

            {column.columnDef.meta?.filter === ETableFilterType.Date && (
              <EntryDate
                disabled={
                  !stateFilter.value ||
                  stateFilter.value === ETypeFilter.Blank ||
                  stateFilter.value === ETypeFilter.NotBlank
                }
                value={columnFilterValue as Dayjs}
                handleChange={handleOnChangeValueDate}
              />
            )}
            {stateFilter.error && <p className="text-error-500">{t('PleaseEnterCompare')}</p>}
            <div className="footer">
              <Button isOutline={true} text={t('Clear')} handleClick={handleReset} />
              <Button text={t('Apply')} handleClick={handleSubmit} />
            </div>
          </div>
        }
        classContainer={classNames('filter', { 'opacity-0': columnFilterValue === undefined })}>
        <Icon name={columnFilterValue === undefined ? EIcon.Filter : EIcon.FilterFill} />
      </Tooltip>
    )
  );
};

export default Component;
