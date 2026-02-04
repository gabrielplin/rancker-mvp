'use client';

import { TooltipTag } from '~/presentation/components/common';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import { PaymentButtonTag } from '.';
import styles from './payment.module.scss';

const PaymentStepComponent = () => {
  const { state, fee, selectedCategories, total } = useRegistrationFlow();

  const { tournament } = state;

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
          <PaymentButtonTag />
        </div>
      </div>
    </section>
  );
};

export default PaymentStepComponent;
