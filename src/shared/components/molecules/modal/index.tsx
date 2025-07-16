'use client';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { EIcon } from '@/shared/enums';
import Button from '../../atoms/button';
import Icon from '../../atoms/icon';
import './style.scss';
import type Props from './type';

const Component = ({
  isOpen,
  title,
  className,
  handleCancel,
  handleOkay,
  isClose = true,
  isFooter = true,
  textCancel = 'Cancel',
  textOkay = 'Okay',
  footerCustom,
  children,
}: Props) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (isOpen) {
      fnShow();
    } else {
      fnHide();
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [isOpen]);

  const [stateModal, setStateModal] = useState({
    isOpen,
    isAppendedToBody: isOpen,
    scrollable: false,
  });
  const refModal = useRef<HTMLDivElement>(null);
  const fnShow = () => {
    setStateModal(old => ({ ...old, isAppendedToBody: true }));
    setTimeout(() => {
      setStateModal(old => ({
        ...old,
        isOpen: true,
        scrollable: (refModal.current?.scrollHeight || 0) > window.innerHeight,
      }));
    }, 30);
  };

  const fnHide = () => {
    setStateModal(old => ({ ...old, isOpen: false }));
    timeout.current = setTimeout(
      () => setStateModal(old => ({ ...old, isAppendedToBody: false })),
      250,
    );
  };

  if (!stateModal.isAppendedToBody) return null;

  return createPortal(
    <section
      ref={refModal}
      className={classNames('modal', {
        open: stateModal.isOpen,
        scrollable: stateModal.scrollable,
      })}
      aria-label={title || 'Modal'}>
      <button onClick={handleCancel} />

      <div className={className}>
        {isClose && (
          <button className="close" onClick={handleCancel}>
            <Icon name={EIcon.Close} />
          </button>
        )}

        {title && <h3>{title}</h3>}

        <div className="body">{children}</div>

        {isFooter &&
          (footerCustom || (
            <div className="footer">
              <Button text={textCancel} isOutline handleClick={handleCancel} />
              <Button text={textOkay} handleClick={handleOkay} />
            </div>
          ))}
      </div>
    </section>,
    document.body,
  );
};

export default Component;
