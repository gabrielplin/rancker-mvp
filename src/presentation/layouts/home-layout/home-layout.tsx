import { PropsWithChildren } from 'react';
import { HeaderTag } from './components';
import styles from './home-layout.module.scss';
import { FooterTag } from '~/presentation/components/common';

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
