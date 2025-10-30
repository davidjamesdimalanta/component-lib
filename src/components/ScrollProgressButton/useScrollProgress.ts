import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll progress as a percentage (0-100%)
 *
 * @param container - Optional scroll container element (defaults to window)
 * @returns Current scroll progress as a percentage (0-100)
 *
 * @example
 * ```tsx
 * const scrollProgress = useScrollProgress();
 * console.log(`Page is ${scrollProgress}% scrolled`);
 * ```
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const progress = useScrollProgress(containerRef.current);
 * ```
 */
export const useScrollProgress = (container?: HTMLElement | null): number => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Get the scroll container (either provided element or window)
    const scrollElement = container || window;
    const isWindow = scrollElement === window;

    // Calculate scroll progress as percentage
    const calculateProgress = () => {
      requestAnimationFrame(() => {
        if (isWindow) {
          // Calculate for window scroll
          const scrollTop = window.scrollY;
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = window.innerHeight;
          const maxScroll = scrollHeight - clientHeight;

          if (maxScroll <= 0) {
            setScrollProgress(0);
            return;
          }

          const progress = (scrollTop / maxScroll) * 100;
          setScrollProgress(Math.min(Math.max(progress, 0), 100));
        } else if (container) {
          // Calculate for container scroll
          const scrollTop = container.scrollTop;
          const scrollHeight = container.scrollHeight;
          const clientHeight = container.clientHeight;
          const maxScroll = scrollHeight - clientHeight;

          if (maxScroll <= 0) {
            setScrollProgress(0);
            return;
          }

          const progress = (scrollTop / maxScroll) * 100;
          setScrollProgress(Math.min(Math.max(progress, 0), 100));
        }
      });
    };

    // Initial calculation
    calculateProgress();

    // Set up scroll listener with passive flag for better performance
    const scrollOptions: AddEventListenerOptions = { passive: true };

    scrollElement.addEventListener('scroll', calculateProgress, scrollOptions);
    window.addEventListener('resize', calculateProgress, scrollOptions);

    // Cleanup
    return () => {
      scrollElement.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [container]);

  return scrollProgress;
};
