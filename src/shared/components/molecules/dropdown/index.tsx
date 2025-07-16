import Menu from '../../atoms/menu';
import Tooltip from '../../atoms/tooltip';
import './style.scss';
import type Props from './type';

const Component = ({ items, children }: Props) => {
  return (
    <Tooltip
      className="dropdown"
      placement="bottom"
      isArrow={false}
      isClick={true}
      content={<Menu items={items} />}>
      {children}
    </Tooltip>
  );
};

export default Component;
