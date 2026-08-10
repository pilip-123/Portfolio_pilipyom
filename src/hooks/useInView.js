import { useEffect, useRef, useState } from 'react';

/**
 * Observes an element and returns a ref + boolean indicating
 * whether the element has entered the viewport.
 */
export default function useInView(options = { threshold: 0.15, once: true }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once) observer.unobserve(entry.target);
        } else if (!options.once) {
          setInView(false);
        }
      },
      { threshold: options.threshold, rootMargin: options.rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
