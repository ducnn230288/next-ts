import classNames from 'classnames';

import { EIcon } from '@/shared/enums';
import Icon from '../icon';
import './style.scss';
import type Props from './type';

const Choice = ({
  label,
  checked,
  handleChange,
  name = 'choice',
  className,
  type = 'checkbox',
  disabled,
  indeterminate,
  value,
}: Props) => {
  const fnChange = () => {
    if (type === 'checkbox') {
      handleChange(!checked);
    } else {
      handleChange(true);
    }
  };

  return (
    <label className={classNames('choice', className, { disabled })}>
      <input
        type={type}
        checked={checked}
        disabled={disabled}
        aria-label={label}
        name={name}
        value={value}
        onChange={() => fnChange()}
      />
      <div className={classNames(type, { checked, indeterminate })} aria-hidden="true">
        {type === 'checkbox' && checked && <Icon name={EIcon.Check} />}
        {type === 'radio' && checked && <span />}
      </div>
      <span>{label}</span>
    </label>
  );
};

export default Choice;
