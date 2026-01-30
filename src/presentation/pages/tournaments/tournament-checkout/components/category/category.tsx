'use client';

import { useRouter } from 'next/navigation';

import styles from './category.module.scss';

import { TournamentCardTag } from '../tournament-card';
import { Controller, useForm } from 'react-hook-form';
import { FormDataCategory } from '../../../types';
import { useEffect, useState } from 'react';
import { useIsMobile } from '~/presentation/hooks/globals';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import { ButtonTag, ModalTag } from '~/presentation/components/common';
import {
  CalendarIcon,
  LocationIcon,
  MedalIcon
} from '~/presentation/components/icons';
import { formatDateBR } from '~/utils';

const CategoryComponent = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [modalSummary, setModalSummary] = useState<boolean>(false);
  const [modalReward, setModalReward] = useState<boolean>(false);

  const { control, watch } = useForm<FormDataCategory>({
    defaultValues: {
      categories: []
    }
  });

  const selectedCategoryIds = watch('categories');

  const { state, setStep, setCategories, total, selectedCategories, fee } =
    useRegistrationFlow();

  const { tournament } = state;

  const isSelectCategories = selectedCategoryIds.length > 0;

  const installments = (installment: number) =>
    (total / installment).toFixed(2); // 3x installment

  const handleNext = async () => {
    // await startRegistration.execute({
    //   tournamentSlug: state.tournamentSlug,
    //   categoryIds: state.categoryIds
    // });
    setStep('info');
  };

  const goToWaze = () => {
    if (!tournament?.longitude || !tournament.longitude) {
      return;
    }

    const link = `https://waze.com/ul?ll=${tournament.latitude},${tournament.longitude}&navigate=yes`;

    router.push(link);
  };

  useEffect(() => {
    setCategories(selectedCategoryIds);
  }, [selectedCategoryIds]);

  return (
    <section>
      <div className={styles.heroTournament}>
        <div className={styles.info}>
          <h2 className={styles.title}>{tournament?.name}</h2>
          <p className={styles.subtitle}>Organizado por {tournament?.name}</p>

          <div className={styles.contentDate}>
            <CalendarIcon />
            <div>
              <p>
                De {formatDateBR(tournament?.startDate)} à{' '}
                {formatDateBR(tournament?.endDate)}
              </p>{' '}
              <span>O dia todo</span>
            </div>
          </div>

          <div className={styles.contentLocation}>
            <LocationIcon />
            <div>
              <p>{tournament?.addressName}</p>{' '}
              <span>
                {tournament?.addressStreet} - {tournament?.addressCity} -{' '}
                {tournament?.addressState} - CEP {tournament?.addressZip}
              </span>
            </div>
          </div>
        </div>

        <img
          src='/assets/png/man-playing-foot-volley.png'
          alt='Banner Torneio'
          className={styles.bannerHero}
        />
      </div>

      <div id='categorias' className={styles.categorySelection}>
        <h3>Escolha quais categorias você quer participar</h3>

        <div className={styles.selectionContainer}>
          <div className={styles.selectionList}>
            {tournament?.categories.map(category => (
              <Controller
                key={category.id}
                name={'categories'}
                control={control}
                render={({ field }) => {
                  const isChecked = field.value.includes(category.id);

                  return (
                    <TournamentCardTag
                      id={category.id}
                      title={category.name}
                      status={category.status}
                      price={category.price}
                      installments={`Em até ${category.maxInstallments}x de R$ ${installments(category.maxInstallments)}`}
                      deadline={'Abertas até 26/01/25'}
                      checked={isChecked}
                      onSelect={checked => {
                        if (checked) {
                          field.onChange([...field.value, category.id]);
                        } else {
                          field.onChange(
                            field.value.filter(id => id !== category.id)
                          );
                        }
                      }}
                      onViewPrize={() => setModalReward(true)}
                    />
                  );
                }}
              />
            ))}
          </div>

          <div
            className={[
              styles.selectionActions,
              ...(modalSummary ? [styles.openModal] : [])
            ].join(' ')}
          >
            <h4>Resumo do Pedido</h4>
            <ul className={styles.orderSummary}>
              {selectedCategories.map(category => (
                <li key={category.id}>
                  <span>{category.name}</span>
                  <span>R$ {category.price?.toFixed(2)}</span>
                </li>
              ))}
              <li>
                <span>Taxas (6%)</span>
                <span>R$ {fee.toFixed(2)}</span>
              </li>
            </ul>
            <div className={styles.totalAmount}>
              <span>Valor Total</span> <span>R$ {total.toFixed(2)}</span>
            </div>

            {isMobile ? (
              <ButtonTag
                primary
                size='large'
                label='Fechar'
                onClick={() => setModalSummary(false)}
              />
            ) : (
              <ButtonTag
                primary
                size='large'
                label='Continuar'
                onClick={handleNext}
                disabled={selectedCategoryIds.length === 0}
              />
            )}
          </div>

          <div className={styles.summaryFloat}>
            {!isSelectCategories ? (
              <>
                <h2>Escolha uma categoria para continuar</h2>
                <ButtonTag
                  primary
                  label='Escolher categoria'
                  onClick={() => router.push('#categorias')}
                  size='large'
                />
              </>
            ) : (
              <>
                <div className={styles.contentFloatTotal}>
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                <p className={styles.contentFloatInstallments}>
                  Em até 10x de R$ {installments(10)}
                </p>

                <span
                  onClick={() => setModalSummary(true)}
                  className={styles.contentFloatToggleDetails}
                >
                  Mais detalhes
                </span>
                <ButtonTag
                  primary
                  label='Continuar'
                  size='large'
                  onClick={handleNext}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.contentInfo}>
        <h2>Descrição</h2>

        <p>{tournament?.description}</p>
      </div>

      <div className={styles.contentInfo}>
        <div>
          <LocationIcon /> <h2>Como Chegar</h2>
        </div>

        {tournament?.addressName && (
          <>
            <h4>Local</h4>
            <p>{tournament.addressName}</p>
          </>
        )}

        <h4>Endereço</h4>
        <p>
          {tournament?.addressStreet} - {tournament?.addressCity} -{' '}
          {tournament?.addressState} - {tournament?.addressZip}
          78557-460
        </p>

        <span onClick={goToWaze}>Abrir no waze</span>
      </div>

      <ModalTag open={modalReward} onClose={() => setModalReward(false)}>
        <div className={styles.rewardContent}>
          <h2 className={styles.rewardTitle}>Premiação</h2>

          <ul className={styles.rewardsList}>
            <li className={styles.rewardItem}>
              <MedalIcon />

              <div className={styles.rewardInfo}>
                <span>Troféus</span>
                <p>À todos os participantes</p>
              </div>
            </li>
            <li className={styles.rewardItem}>
              <MedalIcon />

              <div className={styles.rewardInfo}>
                <span>1o lugar</span>
                <p>R$ 1.000,00</p>
              </div>
            </li>
            <li className={styles.rewardItem}>
              <MedalIcon />

              <div className={styles.rewardInfo}>
                <span>2o lugar</span>
                <p>R$ 500,00</p>
              </div>
            </li>
          </ul>

          {isMobile && (
            <ButtonTag
              label='Fechar'
              primary
              size='large'
              onClick={() => setModalReward(false)}
            />
          )}
        </div>
      </ModalTag>
    </section>
  );
};

export default CategoryComponent;
