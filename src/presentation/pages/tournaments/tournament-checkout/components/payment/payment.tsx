'use client';

import {
  DividerTag,
  ButtonTag,
  TooltipTag
} from '~/presentation/components/common';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import { useIsMobile } from '~/presentation/hooks/globals';
import { initMercadoPago, CardPayment, Wallet } from '@mercadopago/sdk-react';

import styles from './payment.module.scss';
import { useState } from 'react';

const PaymentStepComponent = () => {
  const { state, fee, selectedCategories, total } = useRegistrationFlow();
  const isMobile = useIsMobile();
  const [payment_loading, setPaymentLoad] = useState<boolean>(false);

  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);

  const { tournament, athlete, teams: teamsByCategory } = state;

  const handlePayment = async () => {
    try {
      setPaymentLoad(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tournamentId: tournament?.id,
          categories: selectedCategories.map(category => ({
            id: category.id,
            name: category.name,
            price: category.price
          })),
          teamsByCategory,
          athlete
        })
      });

      console.log(response);

      const { checkoutUrl } = await response.json();

      window.location.href = checkoutUrl;
    } catch (err) {
      console.log('Erro ao iniciar pagamento', err);
    } finally {
      setPaymentLoad(false);
    }
  };

  const handlePixPayment = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tournamentId: tournament?.id,
        categories: selectedCategories,
        teamsByCategory,
        athlete,
        paymentMethod: 'PIX',
        organizerAccessToken: 'gsdsdgsdgsdgsdgsdg'
      })
    });

    const data = await res.json();

    window.open(
      data.point_of_interaction.transaction_data.ticket_url,
      '_blank'
    );
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
                <img src='/assets/png/tournament.jpg' alt='Categoria' />
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

                  {isMobile ? (
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
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles['payment__payment-selected-option']}>
          <h4>Forma de pagamento</h4>

          <CardPayment
            initialization={{
              amount: total,
              payer: { email: 'gabriel.nascimenton.19@gmail.com' }
            }}
            customization={{
              paymentMethods: { maxInstallments: 6 }
            }}
            onSubmit={async formData => {
              await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  tournamentId: tournament?.id,
                  categories: selectedCategories.map(c => ({
                    id: c.id,
                    name: c.name,
                    price: c.price
                  })),
                  teamsByCategory,
                  athlete,
                  paymentMethod: 'CREDIT',
                  cardToken: formData.token,
                  installments: 6,
                  organizerAccessToken: 'sdgsdgsdgsdgsdg', // 🔑
                  total
                })
              });
            }}
          />
          <Wallet
            customization={{
              checkout: { theme: { elementsColor: '#7300ff80' } }
            }}
            initialization={{ preferenceId: 'dsg' }}
          />
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
          <ButtonTag
            primary
            size='large'
            label={payment_loading ? 'Processando...' : 'Concluir Pagamento'}
            full
            onClick={handlePayment}
          />
        </div>
      </div>
    </section>
  );
};

export default PaymentStepComponent;
