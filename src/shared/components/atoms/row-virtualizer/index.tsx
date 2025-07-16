'use client';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { useEffect, useImperativeHandle, useRef } from 'react';

import type Props from './type';

/**
 * Component for rendering a row virtualizer.
 */
const RowVirtualizer = <T,>({
  className,
  data,
  render,
  firstItem,
  heightCell = 25,
  isDisabled,
  handleScroll,
  ref,
}: Props<T>) => {
  const refContainer = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ div: refContainer.current }), []);

  /**
   * Initializes a virtualizer for efficient rendering of a large list.
   */
  const virtualizer = useVirtualizer({
    count: data?.length ?? 0,
    getScrollElement: () => refContainer.current ?? document.body,
    estimateSize: () => heightCell,
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const refScrollOffset = useRef<number>(0);
  useEffect(() => {
    const count = data?.length ?? 0;
    if (count !== virtualizer.options.count) {
      virtualizer.setOptions({
        ...virtualizer.options,
        count: data?.length ?? 0,
      });
      refScrollOffset.current += 1;
    }

    if (!isDisabled) {
      setTimeout(() => {
        virtualizer.scrollToOffset(refScrollOffset.current);
      });
    } else refScrollOffset.current = virtualizer.scrollOffset ?? 0;
  }, [isDisabled, data]);

  const items = virtualizer.getVirtualItems();
  const styleTransform = { transform: `translateY(${items[0]?.start ?? 0}px)` };

  const fnMeasureItems = (el: Element | null | undefined) => {
    if (!el) return;
    virtualizer.measureElement(el);
    return undefined;
  };

  return (
    <div
      ref={refContainer}
      className={classNames('overflow-auto', className)}
      onScroll={handleScroll}>
      {firstItem}
      {!isDisabled && (
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <div style={styleTransform}>
            {items.map(virtualRow => (
              <div key={virtualRow.key + ''} data-index={virtualRow.index} ref={fnMeasureItems}>
                {data && render?.(data[virtualRow.index], virtualRow.index)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RowVirtualizer;
