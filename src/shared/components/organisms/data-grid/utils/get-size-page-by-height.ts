/**
 * Calculates the number of pages based on the height of the document body.
 */
const getSizePageByHeight = ({
  height = 25,
  minusNumber = 4,
  element = document.getElementsByTagName('tbody')[0],
}: {
  readonly height?: number;
  readonly minusNumber?: number;
  readonly element: HTMLDivElement;
}) =>
  Math.floor(
    (document.body.getBoundingClientRect().height - element.getBoundingClientRect().top) / height,
  ) - minusNumber;

export default getSizePageByHeight;
