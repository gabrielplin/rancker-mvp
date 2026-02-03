import { MenuDropdownTag } from '../..';
import styles from './header-logged.module.scss';

type HeaderProps = { user: any };

function HeaderComponent({ user }: HeaderProps) {
  const userType = user.type === 'ATHLETE' ? 'Atleta' : 'Organizador';
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.heading__container}>
          <h2 className={styles.heading__title}>Bem vindo, {userType}</h2>
          <p className={styles.heading__subtitle}>
            Confira as últimas atualizações da Rancker
          </p>
        </div>

        <MenuDropdownTag user={user} />
      </div>
    </header>
  );
}

export default HeaderComponent;
