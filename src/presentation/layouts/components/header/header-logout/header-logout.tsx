'use client';
import { LogoTextIcon } from '~/presentation/components/icons';
import styles from './header-logout.module.scss';
import { useState, useEffect } from 'react';

function HeaderLogoutComponent() {
  const [isScrolled, setScrol] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      setScrol(scrollTop > 40);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.headerScrolled : styles.headerTransparent
      }`}
    >
      <LogoTextIcon />
    </header>
  );
}

export default HeaderLogoutComponent;
