'use client';
import React, { useEffect } from 'react';
import './modal.styles.scss';

type ModalSize = 'sm' | 'md' | 'lg';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  className?: string;
};

function ModalComponent({
  open,
  onClose,
  children,
  size = 'md',
  closeOnBackdrop = true,
  className = ''
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflowY = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [open]);

  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop) return;
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`c-modal c-modal--${size} ${className}`}
      onClick={handleBackdrop}
      role='dialog'
      aria-modal='true'
    >
      <div className='c-modal__panel' onClick={e => e.stopPropagation()}>
        <button
          type='button'
          className='c-modal__close'
          aria-label='Fechar'
          onClick={onClose}
        >
          &times;
        </button>

        <div className='c-modal__body'>{children}</div>
      </div>
    </div>
  );
}

export default ModalComponent;
