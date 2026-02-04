'use client';

import { ButtonTag, TooltipTag } from '~/presentation/components/common';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import { useIsMobile } from '~/presentation/hooks/globals';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import styles from './payment.module.scss';
import { useState, memo } from 'react';

const PaymentStepComponent = () => {
  const { state, fee, selectedCategories, total } = useRegistrationFlow();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [isLoading, setLoad] = useState<boolean>(false);

  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);

  const { tournament, athlete, teams: teamsByCategory } = state;

  const handleCreatePreference = async () => {
    setLoad(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tournamentId: tournament?.id,
        categories: selectedCategories,
        athlete,
        teamsByCategory,
        total
      })
    });

    if (!res.ok) {
      throw new Error('Erro ao criar preferência');
    }

    const data = await res.json();
    setPreferenceId(data.preferenceId);
    setLoad(false);
  };

  return (
    <section className={styles['payment']}>
      <div className={styles['payment__info']}>
        <div className={styles['payment__selectedCategory']}>
          <h4 className={styles['payment__selectedCategory-title']}>
            Informações do seu pedido
          </h4>
          <p className={styles['payment__selectedCategory-subtitle']}>
            Confira quais categorias você se inscreveu.
          </p>

          <ul>
            {selectedCategories.map((category, i) => (
              <li
                key={category.id}
                className={styles['payment__contentCategory']}
              >
                <img src='/assets/na-ilha/ilha.png' alt='Categoria' />
                <div>
                  <h4 className={styles['payment__tournamentName']}>
                    {tournament?.name}
                  </h4>
                  <div className={styles['payment__contentCategory-info']}>
                    <span className={styles['payment__tournamentCategory']}>
                      {category.name}
                    </span>
                    <span className={styles['payment__tournamentAmount']}>
                      R$ {category.price?.toFixed(2)}
                    </span>
                  </div>

                  {/* {isMobile ? (
                    <span className={styles.viewDuos}>Ver Duplas</span>
                  ) : (
                    <>
                      <DividerTag />

                      <span className={styles['payment__your-duo']}>
                        Sua dupla
                      </span>
                      <div className={styles['payment__contentDuo']}>
                        <div>
                          <img src='/assets/png/profile.png' alt='Atleta' />
                          <span>Heitor Campos</span>
                        </div>
                        <div>
                          <img src='/assets/png/profile.png' alt='Atleta' />

                          <span>Heitor Campos</span>
                        </div>
                      </div>
                    </>
                  )} */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles['payment__resume']}>
        <h4>Resumo do pedido</h4>
        <ul className={styles.orderPayment}>
          {selectedCategories.map(category => (
            <li key={category.id}>
              <span>{category.name}</span>
              <span>R$ {category.price?.toFixed(2)}</span>
            </li>
          ))}
          <li>
            <div className={styles.contentHint}>
              <span>Taxas </span>
              <TooltipTag content='O valor refere-se às taxas de manutenção da plataforma, operação e serviço.'>
                <span
                  aria-label='Mais informações'
                  role='img'
                  className={styles.hint}
                >
                  i
                </span>
              </TooltipTag>
            </div>

            <span>R$ {fee.toFixed(2)}</span>
          </li>
        </ul>
        <div className={styles.totalAmount}>
          <span>Valor Total</span> <span>R$ {total.toFixed(2)}</span>
        </div>

        <div className={styles.contentButtons}>
          {preferenceId && (
            <Wallet
              customization={{
                checkout: { theme: { elementsColor: '#7300ff80' } }
              }}
              initialization={{
                preferenceId,
                redirectMode: isMobile ? 'self' : 'blank'
              }}
              locale='pt-BR'
            />
          )}

          {!preferenceId && (
            <ButtonTag
              label={isLoading ? 'Criando pagamento...' : 'Finalizar inscrição'}
              full
              size='large'
              primary
              onClick={handleCreatePreference}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(PaymentStepComponent);
