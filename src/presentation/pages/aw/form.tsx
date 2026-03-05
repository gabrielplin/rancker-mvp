'use client';

import { useForm, Controller } from 'react-hook-form';
import styles from './styles.module.scss';

import { ROOT_CAUSES } from './causes';
import {
  ButtonTag,
  CheckboxGroupTag,
  SelectTag
} from '~/presentation/components/common';

export type PurchaseOverrunForm = {
  cause: string;

  causeChildren: {
    label: string;
    value: string;
    checked?: boolean;
  }[];

  causeGrandchildren: {
    label: string;
    value: string;
    checked?: boolean;
  }[];
};

export default function OverrunForm() {
  const { control, watch, handleSubmit, setValue } =
    useForm<PurchaseOverrunForm>({
      defaultValues: {
        cause: '',
        causeChildren: [],
        causeGrandchildren: []
      }
    });

  const selectedCause = watch('cause');

  const cause = ROOT_CAUSES.find(c => c.value === selectedCause);

  const causeOptions = ROOT_CAUSES.map(c => ({
    label: c.label,
    value: c.value
  }));
  const selectedChildren = watch('causeChildren') || [];

  const selectedChild = cause?.children?.find(child =>
    selectedChildren.some(c => c.value === child.value && c.checked)
  );

  const grandchildren = selectedChild?.children ?? [];

  console.log(grandchildren, 'grandchildren');

  const onSubmit = (data: PurchaseOverrunForm) => {
    console.log('Form data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        name='cause'
        control={control}
        render={({ field }) => (
          <SelectTag
            name={field.name}
            label='Motivo do Estouro'
            value={field.value}
            onChange={(value: string) => {
              field.onChange(value);

              const cause = ROOT_CAUSES.find(c => c.value === value);

              if (cause) {
                setValue(
                  'causeChildren',
                  cause.children.map(child => ({
                    label: child.label,
                    value: child.value,
                    checked: false
                  }))
                );

                setValue('causeGrandchildren', []);
              }
            }}
            options={causeOptions}
            placeholder='Selecione a causa'
          />
        )}
      />

      {cause && (
        <CheckboxGroupTag
          name='causeChildren'
          control={control}
          options={cause.children.map(c => ({
            label: c.label,
            value: c.value
          }))}
          renderChildren={option => {
            const child = cause.children.find(c => c.value === option.value);

            if (!child?.children || child.children.length === 0) {
              return null;
            }

            return (
              <CheckboxGroupTag
                name='causeGrandchildren'
                control={control}
                options={child.children.map(gc => ({
                  label: gc.label,
                  value: gc.value
                }))}
              />
            );
          }}
        />
      )}

      <ButtonTag type='submit' label='Salvar' primary size='large' />
    </form>
  );
}
