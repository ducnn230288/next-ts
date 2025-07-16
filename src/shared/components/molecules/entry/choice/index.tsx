'use client';
import classNames from 'classnames';

import Item from '../../../atoms/choice';
import './style.scss';
import type Props from './type';

const EntryChoice = ({
  options = [],
  disabled = false,
  value = [],
  handleChange,
  name = 'choice',
  direction = 'column',
  className,
  type = 'checkbox',
}: Props) => {
  const fnChange = (optionValue: string | number) => {
    if (type === 'checkbox') {
      if (value.includes(optionValue)) {
        handleChange(value.filter(v => v !== optionValue));
      } else {
        handleChange([...value, optionValue]);
      }
    } else {
      handleChange([optionValue]);
    }
  };

  return (
    <div className={classNames('choice-group', className)} style={{ flexDirection: direction }}>
      {options.map(option => (
        <Item
          key={option.value}
          name={name + '_' + option.value}
          value={option.value}
          label={option.label}
          disabled={!!disabled || !!option.disabled}
          checked={value?.includes(option.value)}
          type={type}
          handleChange={() => fnChange(option.value)}
        />
      ))}
    </div>
  );
};

export default EntryChoice;
