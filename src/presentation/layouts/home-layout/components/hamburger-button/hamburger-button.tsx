type Props = {
  isOpen: boolean;
  onClick: () => void;
};

import { MenuIcon } from '~/presentation/components/icons';
import styles from './hamburger-button.module.scss';

function HamburgerButtonComponent({ isOpen, onClick }: Props) {
  return (
    <button
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      aria-label='Abrir menu'
    >
      <MenuIcon />
    </button>
  );
}

export default HamburgerButtonComponent;
