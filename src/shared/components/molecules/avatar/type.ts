import type PropsRender from './render/type';

/**
 * Represents an object of type TypeObject.
 */
type Props = PropsRender & {
  readonly keySrc?: string;
  readonly keyName?: string;
  readonly maxCount?: number;
};

export default Props;
