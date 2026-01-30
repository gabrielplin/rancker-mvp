'use client';

import { ContentSectionProps } from '../../types';
import styles from './content-section.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function ContentSectionComponent({
  content,
  image,
  contentPosition = 'left'
}: ContentSectionProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'center center']
  });

  // Conteúdo
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  // Imagem
  const imageY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <section ref={ref} className={styles.section}>
      <div
        className={`${styles.container} ${
          contentPosition === 'right' ? styles.reverse : ''
        }`}
      >
        <motion.div
          className={styles.content}
          style={{
            y: contentY,
            opacity: contentOpacity
          }}
        >
          {content}
        </motion.div>

        {image && (
          <motion.div
            className={styles.media}
            style={{
              y: imageY,
              opacity: imageOpacity,
              scale: imageScale
            }}
          >
            <img src={image.src} alt={image.alt || 'Imagem'} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ContentSectionComponent;
