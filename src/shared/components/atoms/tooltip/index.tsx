'use client';
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import classNames from 'classnames';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import './style.scss';
import type Props from './type';

const Component = ({
  children,
  content,
  placement = 'top',
  className,
  isArrow = true,
  isClick,
}: Props) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // Show/hide tooltip on click
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(prev => !prev);
  };

  // Hide tooltip on outside click
  useEffect(() => {
    updatePosition();
    setTimeout(() => {
      updatePosition();
    });
    if (!open) return;
    const handleOutside = (e: Event) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !tooltipRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (!isClick) return;
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  // Position tooltip using floating-ui
  const updatePosition = async () => {
    if (!open || !triggerRef.current || !tooltipRef.current) return;
    const middleware = [offset(isArrow ? 6 : 2), flip(), shift()];

    if (isArrow && arrowRef.current) {
      middleware.push(arrow({ element: arrowRef.current }));
    }

    const {
      x,
      y,
      strategy,
      middlewareData,
      placement: placementPosition,
    } = await computePosition(triggerRef.current, tooltipRef.current, {
      placement,
      middleware,
    });

    Object.assign(tooltipRef.current.style, {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`,
      opacity: 0.95,
    });

    if (isArrow && arrowRef.current && middlewareData.arrow) {
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placementPosition.split('-')[0]];
      Object.assign(arrowRef.current.style, {
        left: middlewareData.arrow.x != null ? `${middlewareData.arrow.x}px` : '',
        top: middlewareData.arrow.y != null ? `${middlewareData.arrow.y}px` : '',
        [staticSide!]: '-5px',
        transform: getArrowTransform(placementPosition),
      });
    }
  };

  // Tooltip element for portal
  const tooltipNode = (
    <div ref={tooltipRef} className={classNames('tooltip', className)}>
      {content}
      {isArrow && <div ref={arrowRef} className="arrow" />}
    </div>
  );

  return (
    <>
      <div
        role="none"
        ref={triggerRef}
        onClick={e => isClick && handleClick(e)}
        onMouseEnter={() => !isClick && setOpen(true)}
        onMouseLeave={() => !isClick && setOpen(false)}
        className="tooltip-container">
        {children}
      </div>
      {open && createPortal(tooltipNode, document.body)}
    </>
  );
};

// Helper to get arrow side based on placement
function getArrowTransform(placement: string) {
  const base = 'rotate(45deg)';
  switch (placement.split('-')[0]) {
    case 'top':
      return base;
    case 'bottom':
      return 'rotate(225deg)';
    case 'left':
      return 'rotate(135deg)';
    case 'right':
      return 'rotate(-45deg)';
    default:
      return base;
  }
}

export default Component;
