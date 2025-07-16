declare const GLightbox: (options: { selector: string }) => { destroy: () => void };
declare const IMask: (
  el: HTMLInputElement,
  options: {
    mask: unknown;
    normalizeZeros?: boolean;
    radix?: string;
    min?: unknown;
    max?: unknown;
    thousandsSeparator?: string;
    lazy?: boolean;
  },
) => void;
