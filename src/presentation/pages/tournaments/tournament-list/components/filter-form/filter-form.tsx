'use client';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import styles from './filter-form.module.scss';
import { categoriesMock, statesMock, tournamentStatusMock } from './mocks';
import {
  SelectTag,
  ButtonTag,
  TextFieldTag
} from '~/presentation/components/common';

function FilterFormComponent() {
  const { control } = useFormContext();

  return (
    <div className={styles.form}>
      <h2>Filtrar por</h2>
      <section>
        <Controller
          name='tournamentStatus'
          control={control}
          render={({ field, fieldState }) => (
            <SelectTag
              name={field.name}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              options={tournamentStatusMock}
              placeholder='Selecione uma opção'
              errorMessage={fieldState.error?.message}
              label='Status do torneio'
            />
          )}
        />
      </section>

      <section className={styles.section}>
        <p>Categoria</p>
        <Controller
          name='categories'
          control={control}
          render={({ field }) => (
            <div className={styles.category__container}>
              {categoriesMock.map(category => {
                const isSelected = field.value.includes(category.id);
                return (
                  <ButtonTag
                    key={category.id}
                    primary
                    label={category.name}
                    className={clsx(
                      styles.category__button,
                      isSelected ? styles['category__button--selected'] : ''
                    )}
                    onClick={e => {
                      e.preventDefault();
                      const categoriesIdsSet = new Set(field.value);

                      if (categoriesIdsSet.has(category.id)) {
                        categoriesIdsSet.delete(category.id);
                      } else {
                        categoriesIdsSet.add(category.id);
                      }

                      field.onChange(Array.from(categoriesIdsSet));
                    }}
                  />
                );
              })}
            </div>
          )}
        />
      </section>

      <section>
        <Controller
          name='state'
          control={control}
          render={({ field, fieldState }) => (
            <SelectTag
              name={field.name}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              options={statesMock}
              placeholder='Selecione uma opção'
              errorMessage={fieldState.error?.message}
              label='Estado'
            />
          )}
        />
      </section>

      <section>
        <TextFieldTag
          label='Cidade'
          type='text'
          name='city'
          control={control}
          placeholder='Informe o nome da cidade'
        />
      </section>

      <footer>
        <ButtonTag primary label='Aplicar filtros' type='submit' />
      </footer>
    </div>
  );
}

export default FilterFormComponent;
