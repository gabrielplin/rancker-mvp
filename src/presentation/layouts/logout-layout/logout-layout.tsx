import { PropsWithChildren } from 'react';
import { FooterTag } from '../../components/common/footer';
import styles from './logout-layout.module.scss';
import { HeaderLogoutTag } from '../components/header/header-logout';

function LogoutLayoutComponent({ children }: PropsWithChildren) {
  return (
    <div className={styles['logout-layout']}>
      <HeaderLogoutTag />
      <main className={styles['logout-layout__main']}>{children}</main>
      <FooterTag />
    </div>
  );
}

export default LogoutLayoutComponent;
