import { useEffect, useState } from 'react';
import useInView from './useInView';

/**
 * Counts up from 0 to `target` once the element is scrolled into view.
 * Returns [ref, currentValue, inView].
 */
export default function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    let startTime = null;

    const tick = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo for a satisfying deceleration
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = target * eased;
      setValue(decimals > 0 ? Number(current.toFixed(decimals)) : Math.round(current));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, decimals]);

  return [ref, value, inView];
}
