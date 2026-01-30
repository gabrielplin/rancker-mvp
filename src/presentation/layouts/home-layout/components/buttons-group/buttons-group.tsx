import Link from 'next/link';
import styles from './buttons-group.module.scss';

function ButtonsGroupComponent() {
  return (
    <div className={styles['buttons-group']}>
      <span>Acesse sua conta</span>
      <p>Em qual torneio iremos participar hoje?</p>
      <Link href='/cadastro'>Criar uma conta</Link>
      <Link className={styles.login} href='/entrar'>
        Fazer login
      </Link>
    </div>
  );
}

export default ButtonsGroupComponent;
