import { LogoWhiteTag, CloseIcon } from '~/presentation/components/icons';
import { ButtonsGroupTag } from '../buttons-group';
import { NavbarTag } from '../navbar';
import styles from './mobile-menu.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function MenuMobileComponent({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <div className={styles.menuClose}>
          <LogoWhiteTag />

          <button className={styles.close} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <ButtonsGroupTag />
      </div>

      <div className={styles.nav}>
        <NavbarTag />
      </div>
    </div>
  );
}

export default MenuMobileComponent;
