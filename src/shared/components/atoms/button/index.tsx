import classNames from 'classnames';

import { Icon } from '@/shared/components/atoms';
import './style.scss';
import type Props from './type';

const Component = ({
  text = '',
  size,
  icon,
  title,
  className,
  disabled,
  isOutline,
  type = 'button',
  handleClick,
}: Props) => {
  const classButton = classNames('btn', size, className, { 'out-line': isOutline });
  const render = () => (
    <>
      {!!icon && <Icon name={icon} className={!size ? 'size-5' : 'size-3'} />}
      {text}
    </>
  );
  return (
    <button
      type={type}
      disabled={disabled}
      title={title ?? text}
      className={classButton}
      onClick={handleClick}>
      {render()}
    </button>
  );
};

export default Component;
