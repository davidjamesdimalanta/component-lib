import type React from 'react';

/**
 * Visual style variant for the scroll progress button
 *
 * - `circular`: Round button with progress indicator in bottom-right corner
 * - `bar`: Horizontal progress bar at top or bottom of viewport
 */
export type ScrollProgressButtonVariant = 'circular' | 'bar';

/**
 * Props for the ScrollProgressButton component
 *
 * @example
 * ```tsx
 * <ScrollProgressButton
 *   variant="circular"
 *   threshold={300}
 *   ariaLabel="Scroll to top"
 * />
 * ```
 */
export interface ScrollProgressButtonProps {
  /**
   * Visual style variant
   * @default 'circular'
   */
  variant?: ScrollProgressButtonVariant;

  /**
   * Custom CSS class names to apply to the button
   */
  className?: string;

  /**
   * Scroll threshold in pixels before button appears
   * @default 300
   */
  threshold?: number;

  /**
   * Custom scroll container element (defaults to window)
   * Pass a ref to track scroll within a specific container
   */
  container?: HTMLElement | null;

  /**
   * Custom click handler called before scrolling to top
   */
  onClick?: () => void;

  /**
   * Button content (defaults to up arrow icon)
   * Only used for circular variant
   */
  children?: React.ReactNode;

  /**
   * Accessible label for screen readers
   * @default 'Scroll to top of page'
   */
  ariaLabel?: string;
}
