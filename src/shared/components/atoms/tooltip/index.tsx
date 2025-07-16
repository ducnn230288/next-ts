'use client';
import { arrow, computePosition, flip, type MiddlewareData, offset, shift } from '@floating-ui/dom';
import classNames from 'classnames';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import './style.scss';
import type Props from './type';

const Component = ({
  placement = 'top',
  className,
  classContainer,
  isArrow = true,
  isClick,
  isWidthFull,
  isOpen,
  isRightClick,
  isDisabled,
  content,
  handleOpen,
  handleClick,
  children,
  ref,
}: Props) => {
  const [stateTooltip, setStateTooltip] = useState({ isOpen: !!isOpen });

  const refArrow = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    setOpen: (isOpen: boolean) => setStateTooltip(old => ({ ...old, isOpen })),
  }));

  useEffect(() => {
    if (stateTooltip.isOpen) fnShow();
  }, [stateTooltip.isOpen]);

  useEffect(() => {
    if (isOpen !== undefined) {
      setStateTooltip(old => ({ ...old, isOpen }));
    }
  }, [isOpen]);

  const fnClick = ({
    e,
    isAllow,
    isClick = true,
  }: {
    e: React.MouseEvent<HTMLDivElement>;
    isAllow: boolean;
    isClick?: boolean;
  }) => {
    if (!isDisabled && isAllow) {
      e.preventDefault();
      if (stateTooltip.isOpen) {
        fnHide();
      } else {
        fnShow();
      }
    }
    if (isClick) handleClick?.(e);
  };

  const fnHover = (isHover: boolean) => {
    if (!isDisabled && !isRightClick && !isClick) {
      if (isHover) {
        fnShow();
      } else {
        fnHide();
      }
    }
  };

  const fnShow = async () => {
    setStateTooltip(old => ({ ...old, isOpen: true }));
    await updatePosition();
    setTimeout(async () => {
      await updatePosition();
      handleOpen?.(stateTooltip.isOpen);
    });
    if (!stateTooltip.isOpen) return;

    if (!isClick && !isRightClick) return;
    document.addEventListener('mousedown', fnOutside);
  };

  const fnHide = () => {
    setStateTooltip(old => ({ ...old, isOpen: false }));
    handleOpen?.(false);

    if (!isClick && !isRightClick) return;
    document.removeEventListener('mousedown', fnOutside);
  };

  const fnOutside = (e: Event) => {
    if (!(e.target as HTMLElement).closest('.tooltip')) {
      fnHide();
    }
  };

  const refTrigger = useRef<HTMLDivElement>(null);
  const refTooltip = useRef<HTMLDivElement>(null);
  const updatePosition = async () => {
    if (!stateTooltip || !refTrigger.current || !refTooltip.current) return;
    const middleware = [offset(isArrow ? 6 : 2), flip(), shift()];

    if (isArrow && refArrow.current) {
      middleware.push(arrow({ element: refArrow.current }));
    }

    const {
      x,
      y,
      strategy,
      middlewareData,
      placement: placementPosition,
    } = await computePosition(refTrigger.current, refTooltip.current, {
      placement,
      middleware,
    });

    Object.assign(refTooltip.current.style, {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`,
      opacity: 1,
    });
    fnPositionArrowIfNeeded(middlewareData, placementPosition);
  };

  const fnPositionArrowIfNeeded = (middlewareData: MiddlewareData, placementPosition: string) => {
    if (isArrow && refArrow.current && middlewareData.arrow) {
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placementPosition.split('-')[0]];
      Object.assign(refArrow.current.style, {
        left: middlewareData.arrow.x != null ? `${middlewareData.arrow.x}px` : '',
        top: middlewareData.arrow.y != null ? `${middlewareData.arrow.y}px` : '',
        [staticSide!]: '-5px',
        transform: getArrowTransform(placementPosition),
      });
    }
  };

  const getArrowTransform = (placement: string) => {
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
  };

  return (
    <>
      <div
        ref={refTrigger}
        className={classNames('tooltip-container', classContainer)}
        onClick={e => fnClick({ e, isAllow: !!isClick })}
        onMouseEnter={() => fnHover(true)}
        onMouseLeave={() => fnHover(false)}
        onContextMenu={e => fnClick({ e, isAllow: !!isRightClick, isClick: false })}
        role="none">
        {children}
      </div>
      {stateTooltip.isOpen &&
        createPortal(
          <div
            ref={refTooltip}
            className={classNames('tooltip', className)}
            style={{ width: isWidthFull ? refTrigger.current?.offsetWidth : undefined }}>
            {content}
            {isArrow && <div className="arrow" ref={refArrow} />}
          </div>,
          document.body,
        )}
    </>
  );
};

export default Component;
