import classNames from 'classnames';

import Icon from '../icon';
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
  handlePaste,
}: Props) => {
  const classButton = classNames('btn', size, className, { line: isOutline });
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
      onClick={handleClick}
      onPaste={handlePaste}>
      {render()}
    </button>
  );
};

export default Component;
