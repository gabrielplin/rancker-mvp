'use client';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import styles from './navbar.module.scss';

type Item = { id: string; label: string };

const items: Item[] = [
  { id: 'start', label: 'Início' },
  { id: 'about', label: 'Sobre Nós' },
  { id: 'tournaments', label: 'Torneios' },
  { id: 'ranking', label: 'Ranking' },
  { id: 'contact', label: 'Contato' }
];

function NavbarComponent() {
  const [active, setActive] = useState<string>('start');

  useEffect(() => {
    const sections = items
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
      }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const handleClick = (e: MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 88;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const links = useMemo(
    () =>
      items.map(item => (
        <li
          key={item.id}
          className={`${styles['navbar__item']} ${
            active === item.id ? styles['navbar__item--active'] : ''
          }`}
        >
          <a
            href={`#${item.id}`}
            className={styles['navbar__link']}
            onClick={e => handleClick(e, item.id)}
          >
            {item.label}
          </a>
        </li>
      )),
    [active]
  );

  return (
    <nav aria-label='Navegação principal'>
      <ul className={styles['navbar']}>{links}</ul>
    </nav>
  );
}

export default NavbarComponent;
