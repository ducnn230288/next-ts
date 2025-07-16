'use client';
import classNames from 'classnames';
import { useRef } from 'react';

import { EIcon } from '@/shared/enums';
import { useTranslations } from 'next-intl';
import Icon from '../../atoms/icon';
import EntrySelect from '../entry/select';
import './style.scss';
import type Props from './type';

type TPagination = { disabled: boolean; type: string; index: number };
/**
 * Represents the pagination configuration.
 */

const Component = ({
  total = 4,
  page = 1,
  perPage = 10,
  description = (from: number, to: number, total: number) =>
    from + '-' + to + ' of ' + total + ' items',
  handleChange,
}: Props) => {
  const t = useTranslations('Components');

  const pageSizeOptions = useRef(
    [perPage, Math.trunc(perPage * 1.5), Math.trunc(perPage * 2.5)].map(item => ({
      value: item,
      label: item.toString(),
    })),
  );

  const ranges = [(page - 1) * perPage + 1, Math.min(page * perPage, total)];
  const lastIndex = Math.ceil(total / perPage);

  const fnMergeWithPrevNextButtons = (
    listOfPage: { index: number; type: string; disabled: boolean }[],
  ) => {
    return [
      { type: 'prev_10', index: -1, disabled: page - 10 < 1 },
      { type: 'prev', index: -1, disabled: page === 1 },
      ...listOfPage,
      { type: 'next', index: -1, disabled: page === lastIndex },
      { type: 'next_10', index: -1, disabled: page + 10 > lastIndex },
    ];
  };
  const fnBuildPageList = (start: number, end: number) => {
    const list: TPagination[] = [];
    for (let i = start; i <= end; i++) {
      list.push({ index: i, type: 'page_' + i, disabled: false });
    }
    return list;
  };
  const fnBuildButtons = (selected: number, last: number) => {
    let listOfRange: TPagination[];
    const prevFiveItem = { type: 'prev_5', index: -1, disabled: false };
    const nextFiveItem = { type: 'next_5', index: -1, disabled: false };
    const firstPageItem = fnBuildPageList(1, 1);
    const lastPageItem = fnBuildPageList(lastIndex, lastIndex);
    if (selected < 4) {
      listOfRange = [...fnBuildPageList(2, 4), nextFiveItem];
    } else if (selected < last - 2) {
      listOfRange = [prevFiveItem, ...fnBuildPageList(selected - 1, selected + 1), nextFiveItem];
    } else {
      listOfRange = [prevFiveItem, ...fnBuildPageList(last - 3, last - 1)];
    }
    return [...firstPageItem, ...listOfRange, ...lastPageItem];
  };

  const fnGeneratePaginationItems = (page: number, lastIndex: number) => {
    if (lastIndex <= 9) {
      return fnMergeWithPrevNextButtons(fnBuildPageList(1, lastIndex));
    } else {
      return fnMergeWithPrevNextButtons(fnBuildButtons(page, lastIndex));
    }
  };
  const paginationItems = fnGeneratePaginationItems(page, lastIndex);

  const fnPerPageChange = (value: string | number) =>
    handleChange?.({ perPage: (value ?? 0) as number, page: page });

  const fnPageChange = ({ type, index }: { type: string; index: number }) => {
    switch (type) {
      case 'prev':
        index = page - 1;
        break;
      case 'prev_10':
        index = page - 10;
        break;
      case 'next':
        index = page + 1;
        break;
      case 'next_10':
        index = page + 10;
        break;
      default:
    }
    if (index > 0) {
      handleChange?.({ perPage, page: index });
    }
  };

  return (
    total > 0 && (
      <div className={'pagination'}>
        <div className={'left'}>
          <EntrySelect
            value={perPage}
            options={pageSizeOptions.current}
            translate={text => text + ' / ' + t('Page').toLowerCase()}
            handleChange={fnPerPageChange}
          />
          <div className="whitespace-nowrap">{description(ranges[0], ranges[1], total)}</div>
        </div>
        <div className="right">
          {paginationItems.map(item => (
            <button
              disabled={item.disabled}
              className={classNames({ active: page === item.index, disabled: item.disabled })}
              onClick={() => fnPageChange(item)}
              aria-label={item.type}
              type={'button'}
              key={item.type}>
              {!item.type.endsWith('5') && (
                <>
                  {item.type.startsWith('prev') && (
                    <Icon
                      name={item.type === 'prev' ? EIcon.Arrow : EIcon.DoubleArrow}
                      className={'rotate-180'}
                    />
                  )}
                  {item.type.startsWith('next') && (
                    <Icon name={item.type === 'next' ? EIcon.Arrow : EIcon.DoubleArrow} />
                  )}
                </>
              )}

              {(item.type === 'prev_5' || item.type === 'next_5') && <span>...</span>}
              {item.type.startsWith('page') && <span>{item.index}</span>}
            </button>
          ))}
        </div>
      </div>
    )
  );
};
export default Component;
