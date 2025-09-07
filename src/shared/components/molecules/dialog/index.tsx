'use client';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { EDialog, EIcon } from '@/shared/enums';
import Button from '../../atoms/button';
import Icon from '../../atoms/icon';
import './style.scss';
import type Props from './type';

export let showDialog: (props: Props) => void;

const Component = () => {
  const [stateDialog, setStateDialog] = useState<
    Props & { isOpen: boolean; isAppendedToBody: boolean; scrollable: boolean }
  >({
    isOpen: false,
    title: '',
    isAppendedToBody: false,
    scrollable: false,
  });

  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    showDialog = (props: Props) => {
      setStateDialog(old => ({
        ...old,
        content: undefined,
        type: undefined,
        ...props,
        isOpen: false,
        isAppendedToBody: false,
        scrollable: false,
      }));
      fnShow();
    };

    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  const refDialog = useRef<HTMLDivElement>(null);
  const fnShow = () => {
    setStateDialog(old => ({ ...old, isAppendedToBody: true }));
    setTimeout(() => {
      setStateDialog(old => ({
        ...old,
        isOpen: true,
        scrollable: (refDialog.current?.scrollHeight || 0) > window.innerHeight,
      }));
    }, 30);
  };

  const fnHide = (callback?: () => void) => {
    setStateDialog(old => ({ ...old, isOpen: false }));
    timeout.current = setTimeout(() => {
      setStateDialog(old => ({
        ...old,
        isAppendedToBody: false,
        onCancel: undefined,
        onOk: undefined,
      }));
      callback?.();
    }, 250);
  };
  const fnOk = () => {
    fnHide(stateDialog.onOk);
  };

  const fnCancel = () => {
    fnHide(stateDialog.onCancel);
  };
  if (!stateDialog.isAppendedToBody) return null;

  const renderIcon = () => {
    switch (stateDialog.type) {
      case EDialog.Error:
        return EIcon.Error;
      case EDialog.Warning:
        return EIcon.Warning;
      case EDialog.Confirm:
        return EIcon.Confirm;
      default:
        return EIcon.Success;
    }
  };

  const renderColor = () => {
    switch (stateDialog.type) {
      case EDialog.Error:
        return 'text-error-500';
      case EDialog.Warning:
        return 'text-warning-500';
      case EDialog.Confirm:
        return 'text-info-500';
      default:
        return 'text-success-500';
    }
  };

  return createPortal(
    <section
      ref={refDialog}
      className={classNames('dialog', {
        open: stateDialog.isOpen,
        scrollable: stateDialog.scrollable,
      })}
      aria-label={stateDialog.title || 'Dialog'}>
      <button onClick={() => fnHide()} />

      <div>
        <h3>
          <Icon name={renderIcon()} className={renderColor()} />
          {stateDialog.title}
        </h3>
        <div className="body">{stateDialog.content}</div>
        <div className="footer">
          {(stateDialog.type === EDialog.Warning || stateDialog.type === EDialog.Confirm) && (
            <Button text={stateDialog.cancelText} isOutline handleClick={fnCancel} />
          )}
          <Button text={stateDialog.okText} handleClick={fnOk} />
        </div>
      </div>
    </section>,
    document.body,
  );
};

export default Component;
