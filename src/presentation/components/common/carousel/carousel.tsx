'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './carousel.module.scss';

type PerView = { desktop?: number; tablet?: number; mobile?: number };

export type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;

  /** alinhamento de snap (só afeta quando allowScroll=true) */
  snapAlign?: 'start' | 'center';

  /** espaçamento entre cards (px) */
  gap?: number;

  /** quantos por viewport (desktop/tablet/mobile) — só para CSS */
  perView?: PerView;

  /** grudar o fim: última página encosta na borda direita */
  edgeLock?: boolean;

  /** permitir scroll manual (mouse/touch). default=false */
  allowScroll?: boolean;

  title?: string;
  showCounter?: boolean;
};

export default function Carousel<T>({
  items,
  renderItem,
  snapAlign = 'start',
  gap = 24,
  perView = { desktop: 3, tablet: 2, mobile: 1 }, // usado no CSS
  edgeLock = false,
  allowScroll = false,
  title,
  showCounter = true
}: CarouselProps<T>) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const data = useMemo(() => items ?? [], [items]);
  const realCount = data.length;

  const [slideW, setSlideW] = useState(0);
  const [pv, setPv] = useState<number>(perView.desktop ?? 3); // valor efetivo medido
  const [page, setPage] = useState(0); // 0-based

  /** mede largura real do slide e pv efetivo pela geometria (mais robusto) */
  const recalc = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const firstSlide = vp.querySelector<HTMLElement>(
      `.${styles['carousel__slide']}`
    );
    if (!firstSlide) return;

    const w = firstSlide.getBoundingClientRect().width;
    setSlideW(w);

    // pv efetivo = quantos cabem pela largura do container
    const step = w + gap;
    const effPv =
      step > 0
        ? Math.max(1, Math.round((vp.clientWidth + gap) / step))
        : Math.max(1, perView.desktop ?? 3);
    setPv(effPv);
  }, [gap, perView.desktop]);

  /** aplica padding final pra “grudar” o último grupo à direita */
  const applyEdgePad = useCallback(() => {
    if (!trackRef.current) return;
    if (!edgeLock || realCount === 0) {
      trackRef.current.style.setProperty('--edge-pad', '0px');
      return;
    }
    const rest = realCount % Math.max(1, pv); // itens “sobrando”
    if (rest === 0) {
      trackRef.current.style.setProperty('--edge-pad', '0px');
      return;
    }
    // Quando edgeLock=true, vamos encostar deslocando até o final (sem ghost).
    // O padding pode ficar 0; manteremos a prop para futuros estilos.
    trackRef.current.style.setProperty('--edge-pad', '0px');
  }, [edgeLock, realCount, pv]);

  /** desloca por índice visual (card) */
  const scrollToLeft = useCallback((left: number, smooth = true) => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  const scrollToVisual = useCallback(
    (visualIdx: number, smooth = true) => {
      const vp = viewportRef.current;
      if (!vp || slideW === 0) return;
      const x = visualIdx * (slideW + gap);
      scrollToLeft(x, smooth);
    },
    [slideW, gap, scrollToLeft]
  );

  /** medir / reagir a resize e quando itens mudarem */
  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(() => recalc());
    if (viewportRef.current) ro.observe(viewportRef.current);
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [recalc, data]);

  /** re-aplica edgeLock (placeholder para futuras mudanças de estilo) */
  useEffect(() => {
    applyEdgePad();
  }, [applyEdgePad]);

  /** páginas e maior índice inicial possível (clamp de navegação) */
  const pvNow = Math.max(1, pv);
  const totalPages = Math.max(1, Math.ceil(realCount / pvNow));
  const maxFirstIndex = (totalPages - 1) * pvNow; // ex.: 5 e pv=3 -> 3

  /** helper: ir para uma página específica (estado + scroll) */
  const goToPage = useCallback(
    (nextPage: number, smooth = true) => {
      const vp = viewportRef.current;
      const tr = trackRef.current;
      if (!vp || !tr || slideW === 0) return;

      const clampedPage = Math.max(0, Math.min(totalPages - 1, nextPage));
      setPage(clampedPage); // atualiza estado já no clique

      if (edgeLock && clampedPage === totalPages - 1) {
        // encosta no fim absoluto (sem repetir/ghost)
        const endLeft = tr.scrollWidth - vp.clientWidth;
        scrollToLeft(Math.max(0, endLeft), smooth);
        return;
        // Isso mostra só os itens restantes na última "página" e gruda na direita.
      }

      const visualIdx = clampedPage * pvNow; // início da página
      scrollToVisual(visualIdx, smooth);
    },
    [edgeLock, pvNow, scrollToLeft, scrollToVisual, slideW, totalPages]
  );

  /** atualiza PÁGINA conforme scroll (programático) e garante clamp */
  useEffect(() => {
    const vp = viewportRef.current;
    const tr = trackRef.current;
    if (!vp || !tr) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (
          edgeLock &&
          Math.abs(vp.scrollLeft - (tr.scrollWidth - vp.clientWidth)) <= 1
        ) {
          // estamos no fim encostado
          setPage(totalPages - 1);
        } else {
          const step = slideW + gap;
          const approx = step ? Math.round(vp.scrollLeft / step) : 0;
          const logicalIdx = Math.max(0, Math.min(maxFirstIndex, approx));
          setPage(Math.floor(logicalIdx / pvNow));
        }
        ticking = false;
      });
    };

    vp.addEventListener('scroll', onScroll, { passive: true });
    return () => vp.removeEventListener('scroll', onScroll);
  }, [edgeLock, gap, maxFirstIndex, pvNow, slideW, totalPages]);

  /** setas andam 1 PÁGINA */
  const go = (dir: -1 | 1) => goToPage(page + dir, true);

  /** bloquear scroll manual com listeners não-passivos (trackpad/mac) */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || allowScroll) return;

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      //  Scroll vertical = deixa a página rolar
      if (absY > absX) return;

      //  Scroll horizontal = bloqueia
      e.preventDefault();
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [allowScroll]);

  const isFirstPage = page <= 0;
  const isLastPage = page >= totalPages - 1;

  /** CSS vars */
  const styleVars: React.CSSProperties = {
    ['--gap' as any]: `${gap}px`,
    ['--per-view-desktop' as any]: String(perView.desktop ?? 3),
    ['--per-view-tablet' as any]: String(perView.tablet ?? 2),
    ['--per-view-mobile' as any]: String(perView.mobile ?? 1)
  };

  return (
    <section
      className={[
        styles.carousel,
        snapAlign === 'center' ? styles['carousel--center'] : '',
        allowScroll ? styles['carousel--scroll'] : styles['carousel--no-scroll']
      ].join(' ')}
      style={styleVars}
      aria-roledescription='carousel'
      aria-label={title}
    >
      <div
        className={styles['carousel__viewport']}
        ref={viewportRef}
        tabIndex={0}
      >
        <div className={styles['carousel__track']} ref={trackRef}>
          {data.map((item, i) => (
            <div className={styles['carousel__slide']} key={i} role='group'>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      <div className={styles['carousel__controls']}>
        <button
          className={`${styles['carousel__btn']} ${styles['carousel__btn--prev']}`}
          aria-label='Anterior'
          onClick={() => go(-1)}
          disabled={isFirstPage}
        >
          ←
        </button>
        <button
          className={`${styles['carousel__btn']} ${styles['carousel__btn--next']}`}
          aria-label='Próximo'
          onClick={() => go(1)}
          disabled={isLastPage}
        >
          →
        </button>

        {showCounter && (
          <span className={styles['carousel__counter']}>
            {String(Math.min(page + 1, totalPages)).padStart(2, '0')} de{' '}
            {String(totalPages).padStart(2, '0')}
          </span>
        )}
      </div>
    </section>
  );
}
