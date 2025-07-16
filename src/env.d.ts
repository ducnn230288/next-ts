declare const GLightbox: (options: { selector: string }) => { destroy: () => void };
declare const IMask: (
  el: HTMLInputElement,
  options: { mask: string | typeof Number; normalizeZeros: boolean; radix: string },
) => void;
