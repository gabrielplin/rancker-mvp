'use client';
import OverrunForm from './form';
import styles from './styles.module.scss';

const AWComponent = () => {
  return (
    <div className={styles.container}>
      <h2>Confirmação de Compra com Estouro</h2>
      <p>
        Por favor, preencha as informações abaixo para confirmar a compra com
        estouro.
      </p>

      <OverrunForm />
    </div>
  );
};

export default AWComponent;
