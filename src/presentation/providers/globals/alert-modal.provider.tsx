'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { AlertModalTag } from '~/presentation/components/common';
import {
  ModalTone,
  ModalMode
} from '~/presentation/components/common/alert-modal/alert-modal';
import { AlertModalContext } from '~/presentation/contexts';

type BaseOptions = {
  title?: string;
  message?: React.ReactNode;
  tone?: ModalTone;
  confirmText?: string;
  cancelText?: string;
  closeOnBackdrop?: boolean;
};

type AlertOptions = BaseOptions;
type ConfirmOptions = BaseOptions;

type NegativeModalState = { open: false };
type PositiveModalState = {
  open: true;
  mode: ModalMode;
  title?: string;
  message?: React.ReactNode;
  tone: ModalTone;
  confirmText: string;
  cancelText: string;
  closeOnBackdrop: boolean;
  resolve?: (value: boolean) => void;
};

type ModalState = NegativeModalState | PositiveModalState;

type ModalContextValue = {
  alert: (opts: AlertOptions | string) => Promise<void>;
  confirm: (opts: ConfirmOptions | string) => Promise<boolean>;
  close: () => void;
};

export function AlertModalProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ModalState>({ open: false });
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (state.open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
    } else {
      lastFocused.current?.focus();
    }
  }, [state.open]);

  const close = useCallback(() => setState({ open: false }), []);

  const alert = useCallback((opts: AlertOptions | string) => {
    return new Promise<void>(resolve => {
      const o = typeof opts === 'string' ? { message: opts } : opts;
      setState({
        open: true,
        mode: 'alert',
        title: o.title ?? 'Atenção',
        message: o.message ?? '',
        tone: o.tone ?? 'warning',
        confirmText: o.confirmText ?? 'OK',
        cancelText: '',
        closeOnBackdrop: o.closeOnBackdrop ?? true,
        resolve: () => {
          resolve();
          setState({ open: false });
        }
      });
    });
  }, []);

  const confirm = useCallback((opts: ConfirmOptions | string) => {
    return new Promise<boolean>(resolve => {
      const o = typeof opts === 'string' ? { message: opts } : opts;
      setState({
        open: true,
        mode: 'confirm',
        title: o.title ?? 'Are you sure?',
        message: o.message ?? 'This action cannot be undone.',
        tone: o.tone ?? 'danger',
        confirmText: o.confirmText ?? 'Confirm',
        cancelText: o.cancelText ?? 'Cancel',
        closeOnBackdrop: o.closeOnBackdrop ?? true,
        resolve: ok => {
          resolve(ok);
          setState({ open: false });
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!state.open) return;
    const s = state as PositiveModalState;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (s.mode === 'confirm') s.resolve?.(false);
        else s.resolve?.(true);
        setState({ open: false });
      }
      if (e.key === 'Enter') {
        s.resolve?.(true);
        setState({ open: false });
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [state]);

  const value = useMemo<ModalContextValue>(
    () => ({ alert, confirm, close }),
    [alert, confirm, close]
  );

  return (
    <AlertModalContext.Provider value={value}>
      {children}
      <AlertModalTag
        open={state.open}
        mode={state.open ? state.mode : 'alert'}
        title={state.open ? state.title : undefined}
        message={state.open ? state.message : undefined}
        tone={state.open ? state.tone : undefined}
        confirmText={state.open ? state.confirmText : undefined}
        cancelText={state.open ? state.cancelText : undefined}
        closeOnBackdrop={state.open ? state.closeOnBackdrop : undefined}
        onConfirm={() => (state as PositiveModalState).resolve?.(true)}
        onCancel={() =>
          (state as PositiveModalState).mode === 'confirm'
            ? (state as PositiveModalState).resolve?.(false)
            : (state as PositiveModalState).resolve?.(true)
        }
      />
    </AlertModalContext.Provider>
  );
}
