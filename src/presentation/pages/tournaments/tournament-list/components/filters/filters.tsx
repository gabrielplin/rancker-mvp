'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FilterFormComponent } from '../filter-form';
import styles from './filters.module.scss';
import {
  SearchInputTag,
  ButtonTag,
  ModalTag
} from '~/presentation/components/common';
import { FilterIcon } from '~/presentation/components/icons';

type FullFilterFormValues = {
  search: string;
  tournamentStatus: string;
  categories: (string | number)[];
  state: string;
  city: string;
};

function FiltersComponent() {
  const [isOpened, setIsOpened] = useState(false);

  const methods = useForm<FullFilterFormValues>({
    defaultValues: {
      search: '',
      tournamentStatus: '',
      categories: [],
      state: '',
      city: ''
    }
  });

  const handleToggleModal = () => {
    setIsOpened(opened => !opened);
  };

  const onSubmit = (data: FullFilterFormValues) => {
    console.log('Filtros e busca aplicados:', data);
    handleToggleModal();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <SearchInputTag
            label={''}
            placeholder='Pesquise por torneios, categorias ou cidades...'
            type={'text'}
            name={'search'}
            control={methods.control}
          />
          <ButtonTag
            startIcon={<FilterIcon />}
            label={'Filtrar por'}
            className={styles.filter__button}
            onClick={handleToggleModal}
            type='button'
          />
        </div>
        <ModalTag open={isOpened} onClose={handleToggleModal} size='lg'>
          <FilterFormComponent />
        </ModalTag>
      </form>
    </FormProvider>
  );
}

export default FiltersComponent;
