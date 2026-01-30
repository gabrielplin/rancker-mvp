'use client';

import Lottie from 'lottie-react';
import React from 'react';
import ReactDOM from 'react-dom';

import styles from './alert-modal.module.scss';
import {
  errorAnimation,
  warningAnimation,
  infoAnimation,
  successAnimation
} from '../../animations';

export type ModalTone = 'danger' | 'warning' | 'info' | 'success';
export type ModalMode = 'alert' | 'confirm';

export type AlertModalAnimations = Partial<Record<ModalTone, object>>;

export type AlertModalProps = {
  open: boolean;
  mode: ModalMode;
  title?: string;
  message?: React.ReactNode;
  tone?: ModalTone;
  confirmText?: string;
  cancelText?: string;
  closeOnBackdrop?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DEFAULT_ANIMATIONS: Record<ModalTone, object> = {
  danger: errorAnimation as object,
  warning: warningAnimation as object,
  info: infoAnimation as object,
  success: successAnimation as object
};

function AlertModalComponent({
  open,
  mode,
  title,
  message,
  tone = 'warning',
  confirmText = 'OK',
  cancelText = 'Cancel',
  closeOnBackdrop = true,
  onConfirm,
  onCancel
}: AlertModalProps) {
  if (!open) return null;
  if (typeof window === 'undefined') return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop) return;
    const dialog = (e.target as HTMLElement).closest(
      `.${styles['cModal__dialog']}`
    );
    if (!dialog) onCancel();
  };

  const dialogMods = [
    styles['cModal__dialog'],
    styles[`cModal__dialog--${tone}` as const]
  ].join(' ');

  const animData = DEFAULT_ANIMATIONS[tone] as object;

  return ReactDOM.createPortal(
    <div
      className={styles.cModal}
      role='dialog'
      aria-modal='true'
      aria-labelledby='alert-modal-title'
      onMouseDown={handleBackdrop}
    >
      <div className={styles['cModal__backdrop']} />
      <div className={dialogMods}>
        <button
          className={styles['cModal__close']}
          aria-label='Close'
          onClick={onCancel}
        >
          ×
        </button>

        <div className={styles['cModal__heading']}>
          <div className={styles['cModal__icon']} aria-hidden>
            <Lottie
              animationData={animData}
              loop={false}
              autoplay
              rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
            />
          </div>

          {title && (
            <h2 id='alert-modal-title' className={styles['cModal__title']}>
              {title}
            </h2>
          )}
          {message && <div className={styles['cModal__body']}>{message}</div>}
        </div>

        <div className={styles['cModal__actions']}>
          {mode === 'confirm' && (
            <button
              className={`${styles['cModal__btn']} ${styles['cModal__btn--ghost']}`}
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}
          <button
            className={`${styles['cModal__btn']} ${styles['cModal__btn--confirm']}`}
            onClick={onConfirm}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default AlertModalComponent;
