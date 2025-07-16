'use client';
import classNames from 'classnames';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { EIcon } from '@/shared/enums';
import Icon from '../icon';
import './style.scss';
import type Props from './type';

const Calendar = ({ value, handleChange, isMultiple }: Props) => {
  useEffect(() => {
    if (value) {
      setStateCalendar(old => ({
        ...old,
        selectedDate: value,
        currentMonth: value[0]?.startOf('month'),
      }));
    }
  }, [value]);

  const [stateCalendar, setStateCalendar] = useState({
    currentMonth: dayjs(),
    selectedDate: value,
  });
  const days = () => {
    const startOfMonth = stateCalendar.currentMonth.startOf('month').startOf('week');
    const totalDays = 42;
    const arr = [];
    let day = startOfMonth;
    for (let i = 0; i < totalDays; i++) {
      arr.push(day);
      day = day.add(1, 'day');
    }
    return arr;
  };
  const weekDays = () => Array.from({ length: 7 }).map((_, i) => dayjs().day(i).format('dd'));

  const isCurrentMonth = (day: Dayjs) => day.isSame(stateCalendar.currentMonth, 'month');
  const isCurrentDay = (day: Dayjs) => day.isSame(dayjs(), 'day');
  const isSelectedDay = (day: Dayjs) =>
    stateCalendar.selectedDate?.[0]?.isSame(day, 'day') ||
    stateCalendar.selectedDate?.[1]?.isSame(day, 'day');
  const isRangeDate = (day: Dayjs) =>
    stateCalendar.selectedDate?.[0]?.isBefore(day, 'day') &&
    stateCalendar.selectedDate?.[1]?.isAfter(day, 'day');

  const daysNextMonth = () => {
    const startOfMonth = stateCalendar.currentMonth
      .startOf('month')
      .add(1, 'month')
      .startOf('week');
    const totalDays = 42;
    const arr = [];
    let day = startOfMonth;
    for (let i = 0; i < totalDays; i++) {
      arr.push(day);
      day = day.add(1, 'day');
    }
    return arr;
  };
  const isNextMonth = (day: Dayjs) =>
    day.isSame(stateCalendar.currentMonth.add(1, 'month'), 'month');

  const fnDateClick = (day: Dayjs) => {
    const selectedDate =
      !isMultiple || stateCalendar.selectedDate?.length !== 1
        ? [day]
        : [stateCalendar.selectedDate[0], day];
    setStateCalendar(old => ({ ...old, selectedDate: selectedDate }));
    handleChange(selectedDate);
  };

  const fnPrevMonthClick = () => {
    const currentMonth = stateCalendar.currentMonth?.subtract(1, 'month');
    if (!currentMonth) return;
    setStateCalendar(old => ({ ...old, currentMonth }));
  };

  const fnNextMonthClick = () => {
    const currentMonth = stateCalendar.currentMonth?.add(1, 'month');
    if (!currentMonth) return;
    setStateCalendar(old => ({ ...old, currentMonth }));
  };

  return (
    <div className={classNames('calendar', { multiple: isMultiple })}>
      <div className="w-52">
        <div className="header">
          <button onClick={fnPrevMonthClick}>
            <Icon name={EIcon.Arrow} className="rotate-180 size-3" />
          </button>
          <h2>{stateCalendar.currentMonth?.format('LT')}</h2>
          {!isMultiple ? (
            <button onClick={fnNextMonthClick}>
              <Icon name={EIcon.Arrow} className="size-3" />
            </button>
          ) : (
            <div />
          )}
        </div>
        <div className="days">
          {weekDays().map((wd, i) => (
            <div key={'day-' + i}>{wd}</div>
          ))}
          {days().map(day => (
            <button
              title={day.format('L')}
              key={day.format('L')}
              className={classNames({
                'outside-month': !isCurrentMonth(day),
                'current-day': isCurrentDay(day),
                selected: (!isMultiple || isCurrentMonth(day)) && isSelectedDay(day),
                'range-date': (!isMultiple || isCurrentMonth(day)) && isRangeDate(day),
              })}
              onClick={() => fnDateClick(day)}>
              {day.date()}
            </button>
          ))}
        </div>
      </div>

      {isMultiple && (
        <div className="w-52">
          <div className="header">
            <div />
            <h2>{stateCalendar.currentMonth?.add(1, 'month').format('LT')}</h2>
            <button onClick={fnNextMonthClick}>
              <Icon name={EIcon.Arrow} className="size-3" />
            </button>
          </div>
          <div className="days">
            {weekDays().map((wd, i) => (
              <div key={'day-' + i}>{wd}</div>
            ))}
            {daysNextMonth().map(day => (
              <button
                title={day.format('L')}
                key={day.format('L')}
                className={classNames({
                  'outside-month': !isNextMonth(day),
                  'current-day': isCurrentDay(day),
                  selected: (!isMultiple || isNextMonth(day)) && isSelectedDay(day),
                  'range-date': (!isMultiple || isNextMonth(day)) && isRangeDate(day),
                })}
                onClick={() => fnDateClick(day)}>
                {day.date()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Calendar;
