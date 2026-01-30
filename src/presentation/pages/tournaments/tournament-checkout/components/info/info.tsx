import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ButtonTag,
  TextFieldTag,
  SelectTag
} from '~/presentation/components/common';
import { AthleteFormData } from '~/presentation/contexts';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';
import styles from './info.module.scss';

type TeamsFormData = {
  athlete: AthleteFormData; // athleteData
};

const InfoComponent = () => {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid }
  } = useForm<TeamsFormData>({
    defaultValues: {
      athlete: {}
    },
    shouldUnregister: false,
    mode: 'onChange'
  });

  const { state, setStep, setAthlete } = useRegistrationFlow();

  const { athlete } = state;

  const athleteRegister = watch('athlete');

  const handleNext = () => {
    setAthlete(athleteRegister);
    setStep('teams');
  };

  const shirtsSize = [
    { label: 'PP', value: 'PP' },
    { label: 'P', value: 'P' },
    { label: 'M', value: 'M' },
    { label: 'G', value: 'G' },
    { label: 'XG', value: 'XG' }
  ];

  console.log(athleteRegister, 'wtach');

  useEffect(() => {
    setValue('athlete', athlete);
  }, []);
  return (
    <section className={styles['team']}>
      <h1 className={styles['team__title']}>Preencha seus dados</h1>

      <form
        onSubmit={handleSubmit(handleNext)}
        className={styles['team__athleteForm']}
      >
        <TextFieldTag
          label='Nome'
          control={control}
          name='athlete.name'
          placeholder='Nome completo'
          rules={{ required: 'Preencha o nome' }}
        />
        <TextFieldTag
          label='E-mail'
          control={control}
          name='athlete.email'
          rules={{ required: 'Preencha o E-mail' }}
          placeholder='example@gmail.com'
        />
        <TextFieldTag
          label='Instagram'
          control={control}
          name='athlete.instagram'
          rules={{ required: 'Instagram é obrigatório' }}
          placeholder='@seuInstagram'
        />
        <TextFieldTag
          label='Whatsapp'
          control={control}
          rules={{ required: 'Preencha seu whatsapp' }}
          name='athlete.phone'
          placeholder='Whatsapp'
        />

        <Controller
          name='athlete.uniformSize'
          control={control}
          rules={{ required: 'Selecione o tamanho do uniforme' }}
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

        <ButtonTag primary size='large' label='Cadastrar Dupla' />
      </form>
    </section>
  );
};

export default InfoComponent;
