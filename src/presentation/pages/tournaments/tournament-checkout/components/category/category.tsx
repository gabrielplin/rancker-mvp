'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formatDateBR } from '~/utils';
import { ButtonTag, ModalTag } from '~/presentation/components/common';
import {
  CalendarIcon,
  LocationIcon,
  MedalIcon
} from '~/presentation/components/icons';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import { useIsMobile } from '~/presentation/hooks/globals';
import { FormDataCategory } from '../../../types';
import { TournamentCardTag } from '../tournament-card';
import styles from './category.module.scss';

const CategoryComponent = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [modalSummary, setModalSummary] = useState<boolean>(false);
  const [modalReward, setModalReward] = useState<number | null>(null);
  const [modalRules, setModalRules] = useState<boolean>(false);

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

  const mapperDeadline = (index: number): string => {
    if (index === 0) return '18/04/2026';
    if (index === 1) return '19/04/2026';
    if (index === 2) return '25/04/2026';
    if (index === 3) return '26/04/2026';

    return '';
  };

  const currentPrize =
    typeof modalReward === 'number'
      ? tournament?.categories[modalReward].prizes
      : {};

  return (
    <section>
      <div
        className={styles.heroTournament}
        style={
          {
            '--color-primary': tournament?.primaryColor,
            '--color-secondary': tournament?.secondaryColor
          } as React.CSSProperties
        }
      >
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
          src='/assets/na-ilha/ilha.png'
          alt='Banner Torneio'
          className={styles.bannerHero}
        />
      </div>

      <ButtonTag
        label='Ver Regulamento'
        variant='default'
        onClick={() => setModalRules(true)}
      />

      <div id='categorias' className={styles.categorySelection}>
        <h3>Escolha quais categorias você quer participar</h3>

        <div className={styles.selectionContainer}>
          <div className={styles.selectionList}>
            {tournament?.categories.map((category, i) => (
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
                      deadline={mapperDeadline(i)}
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
                      onViewPrize={() => setModalReward(i)}
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
                <span>Taxas</span>
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
        <br />

        <p>🌍⚽ NA ILHA WORLD CUP ⚽🌍</p>
        <br />

        <p>O futevôlei entrou em clima de Copa do Mundo.</p>
        <p>
          O Na Ilha World Cup nasce inspirado na Copa do Mundo de 2026 e traz
          para o futevôlei um formato inédito, nunca visto antes.
        </p>
        <p>
          Jogos com hora marcada! Nivelamento levado a sério! Formato inédito no
          futevôlei Cada dupla representa uma seleção!
        </p>
        <p>
          Na Ilha World Cup: onde o futevôlei vive a emoção de uma Copa do Mundo
        </p>
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

      <ModalTag
        open={modalReward !== null}
        onClose={() => setModalReward(null)}
      >
        <div className={styles.rewardContent}>
          <h2 className={styles.rewardTitle}>Premiação</h2>

          <ul className={styles.rewardsList}>
            {Object.entries(currentPrize!).map(([k, v]) => (
              <li key={k} className={styles.rewardItem}>
                <MedalIcon />
                <div className={styles.rewardInfo}>
                  <span>{k}</span>
                  <p>{v}</p>
                </div>
              </li>
            ))}
          </ul>

          {isMobile && (
            <ButtonTag
              label='Fechar'
              primary
              size='large'
              onClick={() => setModalReward(null)}
            />
          )}
        </div>
      </ModalTag>

      <ModalTag open={modalRules} onClose={() => setModalRules(false)}>
        <div className={styles.contentModalRules}>
          <h1>Na Ilha World Cup</h1>

          <h2>1. Categorias</h2>

          <p>O torneio contará com 48 duplas por categoria:</p>
          <p>Masculino Estreante no dia 18/04</p>
          <p>Misto Iniciante no dia 19/04</p>
          <p>Masculino Iniciante no dia 25/04</p>
          <p>Masculino C no dia 26/04</p>

          <h2>2. Modelo de Disputa</h2>

          <p>
            O formato de disputa será inspirado no modelo da Copa do Mundo de
            2026, composto por fase de grupos e fase eliminatória.
          </p>
          <p>Cada categoria começa e termina no mesmo dia.</p>

          <h2>3. Fase de Grupos</h2>

          <p>
            As duplas serão distribuídas em grupos conforme sorteio da
            organização. A fase de grupos terá horário previamente determinado
            para cada grupo e divulgado antes do início da competição. Os jogos
            ocorrerão em blocos de três grupos por horário.
          </p>
          <p>Exemplo:</p>
          <p>08h00 – Grupos A, B e C</p>
          <p>09h30 – Grupos D, E e F</p>

          <h2>4. Horários</h2>

          <p>
            Os jogos terão início às 8:30h. A chegada dos grupos será marcada
            para 30 min antes do início dos jogos. Lembrando que os grupos e
            horários serão pré definidos. Ex: Grupo A, B e C chegada às 8h e
            inicio dos jogos às 8:30h. A tolerância de atraso será de 10 minutos
            no primeira rodada e 5 minutos nos demais jogos. Do contrário, será
            contabilizado como W.O.
          </p>

          <h2>5. Classificação</h2>

          <p>
            Avançam para a fase eliminatória os 2 melhores colocados de cada
            grupo e os 8 melhores terceiros colocados do geral, conforme
            critérios definidos pela organização.
          </p>
          <p>
            A lista oficial dos classificados será divulgada no Instagram
            oficial do torneio ao final da fase de grupos. É de inteira
            responsabilidade dos atletas acompanhar e verificar sua
            classificação.
          </p>

          <h2>6. Fase Eliminatória</h2>

          <p>
            A fase eliminatória terá início às 17h, com confrontos em formato
            mata-mata até a definição dos campeões.
          </p>

          <h2>7. Inscrição e Nivelamento</h2>

          <p>
            É de total responsabilidade do atleta se inscrever na categoria
            correta para seu nível técnico. A organização se reserva o direito
            de eliminar duplas inscritas em categoria incompatível com seu
            nível, sem direito a reembolso.
          </p>

          <h2>8. Disposições Gerais</h2>

          <p>
            A organização poderá ajustar horários, quadras ou tabelas visando o
            bom andamento do evento. Casos omissos neste regulamento serão
            resolvidos exclusivamente pela organização.
          </p>
        </div>
      </ModalTag>
    </section>
  );
};

export default CategoryComponent;
