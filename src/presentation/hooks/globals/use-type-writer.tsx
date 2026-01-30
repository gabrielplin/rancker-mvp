import { useEffect, useRef, useState } from 'react';

interface Segment {
  text: string;
  strong?: boolean;
}

export function useTypewriterSegments(
  segments: Segment[],
  active: boolean,
  speed = 20
) {
  const [rendered, setRendered] = useState<Segment[]>([]);
  const indexRef = useRef({ seg: 0, char: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    function step() {
      const { seg, char } = indexRef.current;
      const segment = segments[seg];
      if (!segment) return;

      setRendered(prev => {
        const next = [...prev];
        if (!next[seg]) next[seg] = { ...segment, text: '' };

        next[seg] = {
          ...segment,
          text: segment.text.slice(0, char + 1)
        };

        return next;
      });

      indexRef.current.char++;

      if (indexRef.current.char >= segment.text.length) {
        indexRef.current.seg++;
        indexRef.current.char = 0;
      }

      if (indexRef.current.seg < segments.length) {
        rafRef.current = requestAnimationFrame(() => setTimeout(step, speed));
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, segments, speed]);

  return rendered;
}
