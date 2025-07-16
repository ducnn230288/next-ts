import type Props from './type';

/**
 * Renders an SVG icon.
 */
const Component = ({ name, className }: Props) => {
  return (
    <svg className={className}>
      <use href={'/assets/images/sprite.svg#icon_' + name} />
    </svg>
  );
};

export default Component;
