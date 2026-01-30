import { PropsWithChildren } from 'react';
import { FooterTag } from '~/architecture/presentation/components/common';
import { HeaderTag } from './components';
import styles from './home-layout.module.scss';

function HomeLayoutComponent({ children }: PropsWithChildren) {
  return (
    <div className={styles['home-layout']}>
      <HeaderTag />

      <main className={styles['home-layout__main']}>
        <div className={styles['home-layout__main__toolbar']} />
        {children}
      </main>
      <FooterTag />
    </div>
  );
}

export default HomeLayoutComponent;
