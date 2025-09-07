export class Resizable {
  private readonly container: HTMLElement;
  private readonly handles: NodeListOf<Element>;
  private isResizing: boolean;
  private currentHandle: Element | null;
  private startX: number;
  private startWidth: number;

  constructor(container: HTMLElement, handles: NodeListOf<Element>) {
    this.container = container;
    this.handles = handles;
    this.isResizing = false;
    this.currentHandle = null;
    this.startX = 0;
    this.startWidth = 0;

    this.init();
  }

  init(): void {
    for (const handle of this.handles) {
      // Mouse events
      handle.addEventListener('mousedown', (e: Event) => this.startResize(e as MouseEvent, handle));

      // Touch events
      handle.addEventListener('touchstart', (e: Event) =>
        this.startResizeTouch(e as TouchEvent, handle),
      );
    }

    document.addEventListener('mousemove', this.resize.bind(this));
    document.addEventListener('touchmove', this.resizeTouch.bind(this));
    document.addEventListener('mouseup', this.stopResize.bind(this));
    document.addEventListener('touchend', this.stopResize.bind(this));

    this.preventIframeInterference();
  }

  startResize(e: MouseEvent, handle: Element): void {
    e.preventDefault();
    e.stopPropagation();

    this.isResizing = true;
    this.currentHandle = handle;
    this.startX = e.clientX;
    const computedStyle = globalThis.getComputedStyle(this.container);
    this.startWidth = Number.parseInt(computedStyle.width, 10);

    this.container.classList.add('resizing');
    document.body.style.userSelect = 'none';
  }

  startResizeTouch(e: TouchEvent, handle: Element): void {
    e.preventDefault();
    e.stopPropagation();

    this.isResizing = true;
    this.currentHandle = handle;
    this.startX = e.touches[0].clientX;
    const computedStyle = globalThis.getComputedStyle(this.container);
    this.startWidth = Number.parseInt(computedStyle.width, 10);

    this.container.classList.add('resizing');
    document.body.style.userSelect = 'none';
  }

  resize(e: MouseEvent): void {
    if (!this.isResizing || !this.currentHandle) return;

    const currentX = e.clientX;
    this.calculateNewWidth(currentX);
    e.preventDefault();
  }

  resizeTouch(e: TouchEvent): void {
    if (!this.isResizing || !this.currentHandle) return;

    const currentX = e.touches[0].clientX;
    this.calculateNewWidth(currentX);
    e.preventDefault();
  }

  calculateNewWidth(currentX: number): void {
    const deltaX = currentX - this.startX;
    let newWidth = this.startWidth + deltaX;

    // Determine resize direction based on handle position
    if (this.currentHandle?.classList.contains('left-handle')) {
      newWidth = this.startWidth - deltaX;
    }
    // Default behavior is right-handle (expand when dragging right)

    this.setWidth(newWidth);
  }

  setWidth(width: number): void {
    const computedStyle = globalThis.getComputedStyle(this.container);
    const minWidth = Number.parseInt(computedStyle.minWidth, 10) || 200;
    const maxWidth = Number.parseInt(computedStyle.maxWidth, 10) || document.body.clientWidth;

    const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, width));
    this.container.style.width = `${constrainedWidth}px`;
  }

  stopResize(): void {
    if (!this.isResizing) return;

    this.isResizing = false;
    this.currentHandle = null;
    this.container.classList.remove('resizing');
    document.body.style.userSelect = '';
  }

  preventIframeInterference(): void {
    const iframe = this.container.querySelector('iframe');
    if (iframe) {
      for (const handle of this.handles) {
        handle.addEventListener('mouseenter', () => {
          iframe.style.pointerEvents = 'none';
        });

        handle.addEventListener('mouseleave', () => {
          setTimeout(() => {
            if (!this.isResizing) {
              iframe.style.pointerEvents = 'auto';
            }
          });
        });
      }
    }
  }
}
