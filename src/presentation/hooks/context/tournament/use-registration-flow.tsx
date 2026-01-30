'use client';

import { useContext } from 'react';
import { RegistrationFlowContext } from '~/presentation/contexts';

export const useRegistrationFlow = () => {
  const context = useContext(RegistrationFlowContext);

  if (!context) {
    throw new Error(
      'useRegistrationFlow must be used within RegistrationFlowProvider'
    );
  }

  return context;
};
