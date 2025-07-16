import type { TList } from '@/shared/types';
import { Icon } from '..';
import './style.scss';
import type Props from './type';

const Component = ({ items, translate }: Props) => {
  const mapList = ({ menu }: { menu: TList }) => (
    <li key={menu.value}>
      <button onClick={menu.onClick}>
        {menu.icon && <Icon name={menu.icon} className="size-5" />}
        {translate(menu.label)}
      </button>
      {menu.children && <ul>{menu.children?.map(subMenu => mapList({ menu: subMenu }))}</ul>}
    </li>
  );

  return <ul className="menu col">{items.map(menu => mapList({ menu }))}</ul>;
};

export default Component;
