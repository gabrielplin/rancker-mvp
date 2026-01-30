import {
  DividerTag,
  TooltipTag,
  ButtonTag
} from '~/presentation/components/common';
import { CheckIcon, CreditCardIcon } from '~/presentation/components/icons';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import { useIsMobile } from '~/presentation/hooks/globals';
import styles from './summary.module.scss';

const SummaryComponent = () => {
  // const finalize = makeFinalizeRegistration();

  // const handlePay = async () => {
  //   await finalize.execute({
  //     tournamentSlug,
  //     paymentMethod: 'pix'
  //   });
  // };

  const { state, setStep, selectedCategories, fee, total } =
    useRegistrationFlow();
  const isMobile = useIsMobile();

  const { tournament } = state;

  return (
    <section className={styles['summary']}>
      <div className={styles['summary__wrapper']}>
        <div className={styles['summary__success']}>
          <CheckIcon />
          <h1>Deu certo! Sua inscrição foi realizada.</h1>
          <p>
            Você receberá as informações de pagamento para o e-mail cadastrado.
          </p>
        </div>
        <div className={styles['summary__content']}>
          <div className={styles['summary__info']}>
            <div className={styles['summary__selectedCategory']}>
              <h4 className={styles['summary__selectedCategory-title']}>
                Detalhes do pedido #11111111
              </h4>
              <p className={styles['summary__selectedCategory-subtitle']}>
                Realizado em 13/04/2024 às 13:15
              </p>

              <ul>
                {selectedCategories.map((category, i) => (
                  <li
                    key={category.id}
                    className={styles['summary__contentCategory']}
                  >
                    <img src='/assets/png/tournament.jpg' alt='Categoria' />
                    <div>
                      <h4 className={styles['summary__tournamentName']}>
                        {tournament?.name}
                      </h4>
                      <div className={styles['summary__contentCategory-info']}>
                        <span className={styles['summary__tournamentCategory']}>
                          {category.name}
                        </span>
                        <span className={styles['summary__tournamentAmount']}>
                          R$ {category.price?.toFixed(2)}
                        </span>
                      </div>

                      {isMobile ? (
                        <span className={styles.viewDuos}>Ver Duplas</span>
                      ) : (
                        <>
                          <DividerTag />

                          <span className={styles['summary__your-duo']}>
                            Sua dupla
                          </span>
                          <div className={styles['summary__contentDuo']}>
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

            <div className={styles['summary__payment-selected-option']}>
              <h4>Forma de pagamento</h4>

              <div className={styles.selectedOptionInfo}>
                <CreditCardIcon />

                <div>
                  <p>Mastercard terminado em 1234</p>
                  <span>2x de R$400,00 com juros</span>
                  <span>Total: R$800,00</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['summary__resume']}>
            <h4>Resumo do pedido</h4>
            <ul className={styles.orderSummary}>
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
                label='Seguir Comprando'
                full
                onClick={() => setStep('summary')}
              />
              <ButtonTag
                full
                size='large'
                label='Ir para o inicio'
                onClick={() => setStep('summary')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummaryComponent;
