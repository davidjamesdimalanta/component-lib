import React, { useState, useEffect, useCallback } from 'react';
import { useScrollProgress } from './useScrollProgress';
import { useReducedMotion } from './useReducedMotion';
import { CircularVariant } from './CircularVariant';
import { BarVariant } from './BarVariant';
import type { ScrollProgressButtonProps } from './ScrollProgressButton.types';

/**
 * ScrollProgressButton Component
 *
 * An accessible scroll-to-top button that displays scroll progress.
 * Supports two variants: circular button and horizontal progress bar.
 *
 * @description
 * - Tracks scroll position in real-time using native browser APIs
 * - Displays visual progress indicator (0-100%)
 * - Smoothly scrolls to top on click (respects motion preferences)
 * - Fully accessible with ARIA support and keyboard navigation
 * - Zero dependencies beyond React and Tailwind CSS
 *
 * @example
 * ```tsx
 * // Default circular button
 * <ScrollProgressButton />
 *
 * // Horizontal bar variant
 * <ScrollProgressButton variant="bar" />
 *
 * // Custom threshold and container
 * <ScrollProgressButton
 *   threshold={500}
 *   container={containerRef.current}
 * />
 * ```
 */
export const ScrollProgressButton: React.FC<ScrollProgressButtonProps> = ({
  variant = 'circular',
  className,
  threshold = 300,
  container,
  onClick,
  children,
  ariaLabel = 'Scroll to top of page',
}) => {
  // Track scroll progress (0-100%)
  const scrollProgress = useScrollProgress(container);

  // Detect motion preferences
  const prefersReducedMotion = useReducedMotion();

  // Track button visibility based on threshold
  const [isVisible, setIsVisible] = useState(false);

  // Update visibility when scroll position changes
  useEffect(() => {
    const scrollElement = container || window;
    const isWindow = scrollElement === window;

    const checkVisibility = () => {
      const scrollTop = isWindow ? window.scrollY : (container?.scrollTop ?? 0);

      setIsVisible(scrollTop > threshold);
    };

    // Initial check
    checkVisibility();

    // Listen for scroll events
    scrollElement.addEventListener('scroll', checkVisibility, {
      passive: true,
    });

    return () => {
      scrollElement.removeEventListener('scroll', checkVisibility);
    };
  }, [container, threshold]);

  // Handle scroll to top
  const handleScrollToTop = useCallback(() => {
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Scroll to top with appropriate behavior
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';
    const scrollElement = container || window;

    if (scrollElement === window) {
      window.scrollTo({ top: 0, behavior });
    } else if (container) {
      container.scrollTo({ top: 0, behavior });
    }
  }, [container, onClick, prefersReducedMotion]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleScrollToTop();
      }
    },
    [handleScrollToTop]
  );

  // Render appropriate variant
  if (variant === 'bar') {
    return (
      <BarVariant
        progress={scrollProgress}
        isVisible={isVisible}
        prefersReducedMotion={prefersReducedMotion}
        className={className}
        ariaLabel={ariaLabel}
        onClick={handleScrollToTop}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <CircularVariant
      progress={scrollProgress}
      isVisible={isVisible}
      prefersReducedMotion={prefersReducedMotion}
      className={className}
      ariaLabel={ariaLabel}
      onClick={handleScrollToTop}
      onKeyDown={handleKeyDown}
    >
      {children}
    </CircularVariant>
  );
};

ScrollProgressButton.displayName = 'ScrollProgressButton';
