import { PropsWithChildren } from 'react';
import {
  HeaderTag,
  SidebarTag
} from '~/architecture/presentation/layouts/components';
import styles from './base-layout.module.scss';

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
