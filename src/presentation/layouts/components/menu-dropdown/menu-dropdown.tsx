'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { makeSignOut } from '~/architecture/main/factories/usecases';
import { ChevronDownIcon } from '~/architecture/presentation/components/icons';
import { useClickOutside } from '~/architecture/presentation/hooks/globals';
import styles from './menu-dropdown.module.scss';

type MenuDropdownProps = {
  user: any;
};

function MenuDropdownComponent({ user }: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownState = isOpen
    ? styles['menu-dropdown__visible']
    : styles['menu-dropdown__hidden'];
  const menuDropdownRef = useRef(null);

  const router = useRouter();

  useClickOutside(menuDropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => setIsOpen(value => !value);

  const handleSignOut = () => {
    const authentication = makeSignOut();
    authentication.signOut();
    router.push('/');
  };

  const path = user.type === 'ATHLETE' ? '/atleta' : '/organizador';

  return (
    <div ref={menuDropdownRef} className={styles['menu-dropdown']}>
      <button
        onClick={toggleDropdown}
        className={styles['menu-dropdown__button']}
        type='button'
      >
        <div className={styles['menu-dropdown__image']} />
        <ChevronDownIcon />
      </button>

      <div className={`${styles['menu-dropdown__panel']} ${dropdownState}`}>
        <div className={styles['menu-dropdown__user-info']}>
          <div>
            <div className={styles['menu-dropdown__user-info-name']}>
              {user?.name}
            </div>
            <div className={styles['menu-dropdown__user-info-email']}>
              {user?.email}
            </div>
          </div>
        </div>

        <ul className={styles['menu-dropdown__link-list']}>
          <li>
            <Link href={path}>Inicio</Link>
          </li>
          <li>
            <Link href={`${path}/torneios`}>Torneios</Link>
          </li>
          <li>
            <Link href={`${path}/meu-perfil`}>Meu Perfil</Link>
          </li>
        </ul>

        <div className={styles['menu-dropdown__separator']} />

        <div className={styles['menu-dropdown__footer']}>
          <Link href='#'>Ajuda</Link>
          <p onClick={handleSignOut}>Sair</p>
        </div>
      </div>
    </div>
  );
}

export default MenuDropdownComponent;
