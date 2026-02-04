import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ButtonTag,
  TextFieldTag,
  SelectTag
} from '~/presentation/components/common';
import { AthleteFormData } from '~/presentation/contexts';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import styles from './team.module.scss';

type TeamsFormData = {
  teams: Record<string, AthleteFormData>; // categoryId -> athleteData
};

const TeamComponent = () => {
  const [indexCategory, setIndexCategory] = useState<number>(0);
  const { control, setValue, watch, handleSubmit } = useForm<TeamsFormData>({
    defaultValues: {
      teams: {}
    },
    shouldUnregister: false
  });

  const { state, setStep, selectedCategories, setTeams } =
    useRegistrationFlow();

  const { tournament, teams } = state;

  const teamsSelected = watch('teams');

  const currentCategory = selectedCategories[indexCategory];
  const fieldName = `teams.${currentCategory.id}` as const;

  const handleNext = async () => {
    if (selectedCategories.length === indexCategory + 1) {
      setTeams(teamsSelected);
      setStep('payment');
      return;
    }

    setIndexCategory(prev => prev + 1);
  };

  const shirtsSize = [
    { label: 'PP', value: 'PP' },
    { label: 'P', value: 'P' },
    { label: 'M', value: 'M' },
    { label: 'G', value: 'G' },
    { label: 'XG', value: 'XG' }
  ];

  useEffect(() => {
    setValue('teams', teams);
  }, []);
  return (
    <section className={styles['team']}>
      <h1 className={styles['team__title']}>Escolha quem jogará com você</h1>
      <p className={styles['team__subtitle']}>Selecione sua dupla.</p>

      <div className={styles['team__head']}>
        <img src='/assets/na-ilha/ilha.png' alt='Categoria' />
        <div>
          <h2 className={styles['team__tournamentName']}>{tournament?.name}</h2>
          <>
            <span className={styles['team__tournamentDuo']}>
              Dupla {indexCategory + 1}
            </span>
            <span className={styles['team__tournamentCategory']}>
              {' '}
              {selectedCategories[indexCategory].name}
            </span>
          </>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleNext)}
        className={styles['team__athleteForm']}
        key={currentCategory.id}
      >
        <TextFieldTag
          label='Nome'
          control={control}
          name={`${fieldName}.name`}
          rules={{ required: 'Preencha o nome' }}
          placeholder='Nome completo'
        />
        <TextFieldTag
          label='E-mail'
          rules={{ required: 'Preencha o E-mail' }}
          control={control}
          name={`${fieldName}.email`}
          placeholder='E-mail obrigatório'
        />
        <TextFieldTag
          label='Instagram'
          rules={{ required: 'Instagram é obrigatório' }}
          control={control}
          name={`${fieldName}.instagram`}
          placeholder='@seuInstagram'
        />
        <TextFieldTag
          label='Whatsapp'
          rules={{ required: 'Preencha seu whatsapp' }}
          control={control}
          name={`${fieldName}.phone`}
          placeholder='Whatsapp'
        />

        <Controller
          name={`${fieldName}.uniformSize`}
          control={control}
          rules={{ required: 'Selecione o tamanho do uniforme' }}
          defaultValue={'P'}
          render={({ field }) => (
            <SelectTag
              label='Tamanho do uniforme'
              name={field.name}
              options={shirtsSize}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <ButtonTag
          primary
          size='large'
          label='Continuar'
          onClick={handleNext}
        />
      </form>
    </section>
  );
};

export default TeamComponent;
