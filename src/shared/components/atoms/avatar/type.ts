import type PropsRender from './item/type';

/**
 * Represents an object of type TypeObject.
 */
type Props = PropsRender & {
  readonly keySrc?: string;
  readonly keyName?: string;
  readonly maxCount?: number;
};

export default Props;
