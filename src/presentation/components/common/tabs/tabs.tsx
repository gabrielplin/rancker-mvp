'use client';

import { ReactNode, useState } from 'react';
import styles from './tabs.module.scss';

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initial: number;
  onClick?: (index: number) => void;
}

function TabsComponent({ tabs, initial, onClick }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(initial ?? 0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onClick) onClick(index);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles['tabs__headers']}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`${styles['tabs__tab']} ${index === activeIndex ? styles['tabs__tab--active'] : ''}`}
            onClick={() => handleClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles['tabs__content']}>{tabs[activeIndex].content}</div>
    </div>
  );
}

export default TabsComponent;
