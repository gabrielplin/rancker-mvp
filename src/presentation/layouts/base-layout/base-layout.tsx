import { PropsWithChildren } from 'react';

import styles from './base-layout.module.scss';
import { SidebarTag, HeaderTag } from '../components';

type BaseLayoutProps = PropsWithChildren & {
  user: any;
  mode?: 'organizer' | 'athlete';
};

function BaseLayoutComponent({
  user,
  mode = 'organizer',
  children
}: BaseLayoutProps) {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarTag mode={mode} />
      <main className={styles.content}>
        <HeaderTag user={user} />
        {children}
      </main>
    </div>
  );
}

export default BaseLayoutComponent;
