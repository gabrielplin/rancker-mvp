'use client';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState, memo } from 'react';
import { ButtonTag } from '~/presentation/components/common';
import { useRegistrationFlow } from '~/presentation/hooks/context';

const PaymentStepComponent = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setLoad] = useState(false);
  const { state, selectedCategories, total } = useRegistrationFlow();

  const { tournament, athlete, teams: teamsByCategory } = state;

  const payload = {
    tournamentId: tournament?.id,
    categories: selectedCategories,
    athlete,
    teamsByCategory,
    total
  };

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);
  }, []);

  const handleCreatePreference = async () => {
    try {
      setLoad(true);

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erro ao criar preferência');

      const data = await res.json();
      setPreferenceId(data.preferenceId);
    } catch (e) {
      console.error(e);
      alert('Erro ao iniciar pagamento');
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      {preferenceId ? (
        <Wallet
          initialization={{
            preferenceId,
            redirectMode: 'self'
          }}
          locale='pt-BR'
        />
      ) : (
        <ButtonTag
          label={isLoading ? 'Criando pagamento...' : 'Finalizar inscrição'}
          onClick={handleCreatePreference}
          full
          size='large'
          primary
        />
      )}
    </>
  );
};

export default memo(PaymentStepComponent);
