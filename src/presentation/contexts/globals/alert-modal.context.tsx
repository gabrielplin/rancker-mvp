'use client';
import { createContext, ReactNode } from 'react';
import { ModalTone } from '~/presentation/components/common/alert-modal/alert-modal';

type BaseOptions = {
  title?: string;
  message?: ReactNode;
  tone?: ModalTone;
  confirmText?: string;
  cancelText?: string;
  closeOnBackdrop?: boolean;
};

type AlertOptions = BaseOptions;
type ConfirmOptions = BaseOptions;

type ModalContextValue = {
  alert: (opts: AlertOptions | string) => Promise<void>;
  confirm: (opts: ConfirmOptions | string) => Promise<boolean>;
  close: () => void;
};

export const AlertModalContext = createContext<ModalContextValue | null>(null);
