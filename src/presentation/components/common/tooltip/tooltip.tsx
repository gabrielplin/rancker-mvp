'use client';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';
import styles from './tooltip.module.scss';

type Props = {
  content: ReactNode;
  children: ReactNode;
  delay?: number;
};

function TooltipComponent({ content, children, delay = 250 }: Props) {
  return (
    <Tooltip.Provider delayDuration={delay}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={8} className={styles.tooltip}>
            {content}
            <Tooltip.Arrow className={styles.arrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default TooltipComponent;
