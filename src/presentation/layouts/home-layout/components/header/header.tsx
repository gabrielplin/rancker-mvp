'use client';

import { useEffect, useState } from 'react';

import styles from './header.module.scss';
import { LogoWhiteTag, LogoSymbolIcon } from '~/presentation/components/icons';
import { useIsMobile } from '~/presentation/hooks/globals';
import { ButtonsGroupTag } from '../buttons-group';
import { HamburgerButtonTag } from '../hamburger-button';
import { MobileMenuTag } from '../mobile-menu';
import { NavbarTag } from '../navbar';

function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setScrol] = useState<boolean>(false);
  const isMobile = useIsMobile();

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
    <>
      <header
        className={`${styles.header} ${
          isScrolled ? styles.headerScrolled : styles.headerTransparent
        }`}
      >
        <div className={styles.header__wrapper}>
          <div className={styles.header__logoBox}>
            {isMobile ? <LogoWhiteTag /> : <LogoSymbolIcon />}
          </div>

          {/* Desktop */}
          <div className={styles.header__desktop}>
            <NavbarTag />
            <ButtonsGroupTag />
          </div>

          {/* Mobile */}
          <HamburgerButtonTag
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(prev => !prev)}
          />
        </div>
      </header>

      <MobileMenuTag isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default HeaderComponent;
