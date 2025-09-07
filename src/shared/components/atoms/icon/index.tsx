import './style.scss';
import type Props from './type';
const version = '?v=1';
/**
 * Renders an SVG icon.
 */
const Component = ({ name, className }: Props) => {
  return (
    <svg className={className}>
      <use href={`/assets/images/sprite.svg${version}#icon_${name}`} />
    </svg>
  );
};

export default Component;
