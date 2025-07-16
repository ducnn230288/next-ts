'use client';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { EIcon } from '@/shared/enums';
import SvgIcon from '../svg-icon';
import './style.scss';
import type Props from './type';

const Component = ({ isOpen, header, children, footer, onClose, isHiddenClose }: Props) => {
  const [stateModal, setStateModal] = useState({ isOpen, isAppendedToBody: isOpen });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setStateModal(old => ({ ...old, isAppendedToBody: true }));
      setTimeout(() => setStateModal(old => ({ ...old, isOpen: true })), 30);
    } else {
      setStateModal(old => ({ ...old, isOpen: false }));
      timeoutRef.current = setTimeout(
        () => setStateModal(old => ({ ...old, isAppendedToBody: false })),
        250,
      );
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isOpen]);

  if (!stateModal.isAppendedToBody) return null;

  return createPortal(
    <div className={classNames('modal', { open: stateModal.isOpen })}>
      <button onClick={onClose} />
      <div>
        {!isHiddenClose && (
          <button className="close" onClick={onClose}>
            <SvgIcon name={EIcon.Close} />
          </button>
        )}

        {header && <div className="header">{header}</div>}
        <div className="body">{children}</div>
        {footer && <div className="footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};

export default Component;
