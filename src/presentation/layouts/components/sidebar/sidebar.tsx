'use client';

import Link from 'next/link';
import { useState } from 'react';

import styles from './sidebar.module.scss';
import {
  HomeIcon,
  PlusIcon,
  VolleyIcon,
  PaymentIcon
} from '~/presentation/components/icons';

type SidebarProps = {
  mode?: 'organizer' | 'athlete';
};

function SidebarComponent({ mode }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const organizerMenu = [
    {
      url: '/organizador',
      icon: <HomeIcon />,
      label: 'Início'
    },
    {
      url: '/organizador/torneios/cadastro',
      icon: <PlusIcon />,
      label: 'Novo Torneio'
    },
    {
      url: '/organizador/torneios',
      icon: <VolleyIcon />,
      label: 'Meus Torneios'
    },
    {
      url: '/organizador/dados-bancarios',
      icon: <PaymentIcon />,
      label: 'Dados Bancários'
    }
  ];

  const athleteMenu = [
    {
      url: '/atleta',
      icon: <HomeIcon />,
      label: 'Início'
    },
    {
      url: '/atleta/torneios',
      icon: <VolleyIcon />,
      label: 'Meus Torneios'
    },
    {
      url: '/atleta/dados-bancarios',
      icon: <PaymentIcon />,
      label: 'Dados Bancários'
    }
  ];

  const menu = mode === 'organizer' ? organizerMenu : athleteMenu;

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <button className={styles.toggle} onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={styles.menu}>
        {menu.map(item => (
          <Link key={item.url} href={item.url} className={styles.item}>
            <div className={styles.icon}>{item.icon}</div>
            {open && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default SidebarComponent;
