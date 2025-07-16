/**
 * Represents the properties for the Avatar component.
 */
type Props = {
  readonly src?: string;
  readonly text?: string | { [selector: string]: string }[];
  readonly classSize?: string;
  readonly showName?: boolean;
  readonly index?: number;
};
export default Props;
