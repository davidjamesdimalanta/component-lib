import type React from 'react';

/**
 * Component mode determining button behavior
 *
 * - `scroll-gated`: Button disabled until user scrolls through content (primary use case)
 * - `scroll-to-top`: Traditional scroll-to-top button (legacy mode)
 */
export type ScrollProgressButtonMode = 'scroll-gated' | 'scroll-to-top';

/**
 * Visual style variant for the scroll progress button
 *
 * - `button`: Button with progress indicator (supports circular or rectangular shapes)
 * - `bar`: Horizontal progress bar at top or bottom of viewport (scroll-gated only)
 */
export type ScrollProgressButtonVariant = 'button' | 'bar';

/**
 * Shape of the button variant
 *
 * - `circular`: Round button (default for scroll-to-top mode)
 * - `rectangular`: Rectangular button with rounded corners (default for scroll-gated mode)
 */
export type ButtonShape = 'circular' | 'rectangular';

/**
 * Preset color options for button styling
 *
 * - `dark`: Dark grey button with lighter grey fill
 * - `primary`: Uses theme primary colors
 * - `secondary`: Uses theme secondary colors
 */
export type ColorPreset = 'dark' | 'primary' | 'secondary';

/**
 * Props for the ScrollProgressButton component
 *
 * @example
 * ```tsx
 * // Scroll-gated form submission (primary use case)
 * <ScrollProgressButton
 *   mode="scroll-gated"
 *   variant="button"
 *   buttonText="Accept Terms"
 *   buttonColor="dark"
 *   completionThreshold={95}
 *   onScrollComplete={() => setAgreed(true)}
 * />
 *
 * // Traditional scroll-to-top (legacy mode)
 * <ScrollProgressButton
 *   mode="scroll-to-top"
 *   variant="button"
 *   shape="circular"
 *   threshold={300}
 * />
 * ```
 */
export interface ScrollProgressButtonProps {
  /**
   * Component mode: determines button behavior
   * - `scroll-gated`: Disabled until user scrolls through content (default)
   * - `scroll-to-top`: Scrolls to top when clicked (legacy)
   * @default 'scroll-gated'
   */
  mode?: ScrollProgressButtonMode;

  /**
   * Visual style variant
   * - `button`: Button variant (default)
   * - `bar`: Bar variant (scroll-gated only)
   * @default 'button'
   */
  variant?: ScrollProgressButtonVariant;

  /**
   * Shape of the button (only applies to 'button' variant)
   * - `circular`: Round button (auto-default for scroll-to-top mode)
   * - `rectangular`: Rectangular button (auto-default for scroll-gated mode)
   * @default 'rectangular' for scroll-gated, 'circular' for scroll-to-top
   */
  shape?: ButtonShape;

  /**
   * Text content for the button (applies to 'button' variant)
   * @default 'Submit' for scroll-gated mode, undefined for scroll-to-top mode
   */
  buttonText?: string;

  /**
   * Icon to display in the button (applies to 'button' variant)
   * Can be any React node (SVG, component, etc.)
   * @default undefined for scroll-gated, up-arrow icon for scroll-to-top
   */
  icon?: React.ReactNode;

  /**
   * Button background color
   * Accepts preset ('dark', 'primary', 'secondary') or custom Tailwind class
   * @example 'dark' | 'bg-gray-900' | 'bg-custom-brand' | 'bg-[#1a1a1a]'
   * @default 'primary'
   */
  buttonColor?: ColorPreset | string;

  /**
   * Progress fill color
   * Accepts preset or custom Tailwind class (same as buttonColor)
   * @default 'bg-gray-700' for 'dark' preset, theme accent for others
   */
  fillColor?: string;

  /**
   * Custom CSS class names to apply to the button
   */
  className?: string;

  /**
   * Scroll completion threshold percentage (0-100) before enabling button
   * Only applies to scroll-gated mode
   * @default 95
   */
  completionThreshold?: number;

  /**
   * Scroll threshold in pixels before button appears
   * Only applies to scroll-to-top mode for visibility control
   * @default 300
   */
  threshold?: number;

  /**
   * Custom scroll container element (defaults to window)
   * Pass a ref to track scroll within a specific container
   */
  container?: HTMLElement | null;

  /**
   * Button HTML type attribute
   * @default 'submit' for scroll-gated mode
   * @default 'button' for scroll-to-top mode
   */
  type?: 'submit' | 'button';

  /**
   * Manual disabled override
   * Disables button regardless of scroll progress
   */
  disabled?: boolean;

  /**
   * Custom click handler
   * - In scroll-gated mode: called when enabled button is clicked
   * - In scroll-to-top mode: called before scrolling to top
   */
  onClick?: () => void;

  /**
   * Callback fired when scroll completion threshold is reached
   * Only applies to scroll-gated mode
   * Fires once when scrollProgress >= completionThreshold
   */
  onScrollComplete?: () => void;

  /**
   * Button content
   * - In scroll-gated mode: typically text like "Accept & Continue"
   * - In scroll-to-top mode: defaults to up arrow icon for circular variant
   */
  children?: React.ReactNode;

  /**
   * Accessible label for screen readers
   * @default 'Scroll to continue' for scroll-gated mode
   * @default 'Scroll to top of page' for scroll-to-top mode
   */
  ariaLabel?: string;
}
