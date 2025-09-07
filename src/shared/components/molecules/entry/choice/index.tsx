'use client';
import classNames from 'classnames';

import type { TOption } from '@/shared/types';
import Item from '../../../atoms/choice';
import './style.scss';
import type Props from './type';

const EntryChoice = ({
  options = [],
  disabled = false,
  value = [],
  handleChange,
  name = 'choice',
  direction = 'row',
  className,
  type = 'checkbox',
}: Props) => {
  const fnChange = (optionValue: string | number) => {
    if (type === 'checkbox' && Array.isArray(value)) {
      if (value.includes(optionValue)) {
        handleChange(value.filter(v => v !== optionValue));
      } else {
        handleChange([...value, optionValue]);
      }
    } else {
      handleChange([optionValue]);
    }
  };

  const fnGetChecked = ({ option }: { option: TOption }) =>
    Array.isArray(value) ? value?.includes(option.value) : value === option.value;

  return (
    <div className={classNames('choice-group', className)} style={{ flexDirection: direction }}>
      {options.map(option => (
        <Item
          key={option.value}
          name={name + '_' + option.value}
          value={option.value}
          label={option.label}
          disabled={!!disabled || !!option.disabled}
          checked={fnGetChecked({ option })}
          type={type}
          handleChange={() => fnChange(option.value)}
        />
      ))}
    </div>
  );
};

export default EntryChoice;
