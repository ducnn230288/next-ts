import type { TList } from '@/shared/types';
import './style.scss';
import type Props from './type';

const Component = ({ items }: Props) => {
  const mapList = ({ menu }: { menu: TList }) => (
    <li key={menu.value}>
      <button onClick={menu.onClick}>{menu.label}</button>
      {menu.children && <ul>{menu.children?.map(subMenu => mapList({ menu: subMenu }))}</ul>}
    </li>
  );

  return <ul className="menu col">{items.map(menu => mapList({ menu }))}</ul>;
};

export default Component;
