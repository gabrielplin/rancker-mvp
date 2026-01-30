'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './step-tabs.module.scss';

const steps = [
  { label: 'Dados gerais', href: '/organizador/torneios/cadastro/passo1' },
  { label: 'Categorias', href: '/organizador/torneios/cadastro/passo2' },
  { label: 'Quadras', href: '/organizador/torneios/cadastro/passo3' },
  { label: 'Finalização', href: '/organizador/torneios/cadastro/passo5' }
];

function StepTabsComponent() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      {steps.map((step, index) => {
        const isActive = pathname === step.href;

        return (
          <div key={index} className={styles.stepWrapper}>
            <Link
              href={step.href}
              className={`${styles.step} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.index}>{index + 1}.</span> {step.label}
            </Link>
            {index < steps.length - 1 && <div className={styles.connector} />}
          </div>
        );
      })}
    </div>
  );
}

export default StepTabsComponent;
