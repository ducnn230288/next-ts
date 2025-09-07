'use client';
import dayjs, { type Dayjs } from 'dayjs';
import { useRef } from 'react';

import { Icon } from '@/shared/components/atoms';
import { EIcon } from '@/shared/enums';
import { EPlacement } from '@/shared/enums/placement';
import Calendar from '../../../atoms/calendar';
import Tooltip from '../../../atoms/tooltip';
import EntryMask from '../mask';
import './style.scss';
import type Props from './type';

const EntryDate = ({
  title = 'Entry Date',
  value,
  handleChange,
  name,
  disabled,
  placeholder,
  isMultiple,
}: Props) => {
  const refTooltip = useRef<{ setOpen: (isOpen: boolean) => void }>(null);
  const refInput = useRef<{ refInput: HTMLInputElement } | null>(null);
  const refInputEnd = useRef<{ refInput: HTMLInputElement } | null>(null);
  const fnChange = (date: Dayjs[]) => {
    if (!isMultiple || date.length === 2) {
      refTooltip.current?.setOpen(false);
      handleChange((isMultiple ? date : date[0]) as never);
    }
    if (date?.[0]) {
      refInput.current!.refInput.value = date?.[0].format('L');
      refInputEnd.current?.refInput?.focus();
      refInputEnd.current?.refInput?.select();
    }
    if (date?.[1]) refInputEnd.current!.refInput.value = date?.[1].format('L');
  };
  const fnGetValue = () => refInput.current!.refInput.value;

  const fnStartDateFocus = () => {
    refInput.current!.refInput.focus();
    refInput.current!.refInput.select();
  };
  const inlineValue = Array.isArray(value) ? value : value && [value];

  return (
    <Tooltip
      title={title}
      ref={refTooltip}
      isArrow={false}
      isClick={true}
      isDisabled={disabled}
      placement={EPlacement.BottomEnd}
      classContainer="entry-date"
      className="dropdown"
      handleOpen={fnStartDateFocus}
      content={<Calendar value={inlineValue} handleChange={fnChange} isMultiple={isMultiple} />}>
      <EntryMask
        disabled={disabled}
        name={name}
        value={inlineValue?.[0]?.format('L')}
        placeholder={placeholder}
        ref={refInput}
        handleChange={day => fnChange([dayjs(day)])}
        mask="date"
        autoComplete="off"
        iconAfter={!isMultiple ? EIcon.Calendar : undefined}
      />
      {isMultiple && (
        <>
          <Icon className="arrow" name={EIcon.Sort} />
          <EntryMask
            disabled={disabled}
            name={name}
            value={inlineValue?.[1]?.format('L')}
            placeholder={placeholder}
            ref={refInputEnd}
            handleChange={day => fnChange([dayjs(fnGetValue()), dayjs(day)])}
            mask="date"
            autoComplete="off"
            iconAfter={EIcon.Calendar}
          />
        </>
      )}
    </Tooltip>
  );
};
export default EntryDate;
