import { useContext } from 'react';
import { AlertModalContext } from '~/presentation/contexts';

export const useAlertModal = () => {
  const ctx = useContext(AlertModalContext);

  if (!ctx)
    throw new Error('useAlertModal must be used within AlertModalProvider');

  return ctx;
};
