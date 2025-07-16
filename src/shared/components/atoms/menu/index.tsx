import classNames from 'classnames';

import type { TOption } from '@/shared/types';
import Icon from '../icon';
import './style.scss';
import type Props from './type';

const Component = ({ options, translate }: Props) => {
  const mapList = ({ option }: { option: TOption }) => (
    <li key={option.value}>
      <button
        className={classNames({ active: option.isActive, disabled: option.disabled })}
        title={translate(option.label)}
        onClick={option.onClick}
        type="button">
        {option.icon && <Icon name={option.icon} />}
        {translate(option.label)}
      </button>
      {option.children?.length && (
        <ul>{option.children?.map(childOption => mapList({ option: childOption }))}</ul>
      )}
    </li>
  );

  return <ul className="menu col">{options.map(option => mapList({ option }))}</ul>;
};

export default Component;
