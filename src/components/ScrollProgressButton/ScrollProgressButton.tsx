import React, { useState, useEffect, useCallback } from 'react';
import { useScrollProgress } from './useScrollProgress';
import { useReducedMotion } from './useReducedMotion';
import { ButtonVariant } from './ButtonVariant';
import { BarVariant } from './BarVariant';
import type { ScrollProgressButtonProps } from './ScrollProgressButton.types';

/**
 * ScrollProgressButton Component
 *
 * A versatile button component with two modes:
 * 1. Scroll-gated (primary): Disabled until user scrolls through content
 * 2. Scroll-to-top (legacy): Scrolls to top when clicked
 *
 * @description
 * - Tracks scroll position in real-time using native browser APIs
 * - Displays visual progress indicator (0-100%)
 * - Scroll-gated mode: Perfect for Terms of Service, content gates
 * - Scroll-to-top mode: Traditional back-to-top button
 * - Fully accessible with ARIA support and keyboard navigation
 * - Zero dependencies beyond React and Tailwind CSS
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
 * // Traditional scroll-to-top (legacy)
 * <ScrollProgressButton mode="scroll-to-top" variant="button" shape="circular" />
 * ```
 */
export const ScrollProgressButton: React.FC<ScrollProgressButtonProps> = ({
  mode = 'scroll-gated',
  variant = 'button',
  shape,
  buttonText,
  icon,
  buttonColor = 'primary',
  fillColor,
  className,
  completionThreshold = 95,
  threshold = 300,
  container,
  type,
  disabled: manualDisabled = false,
  onClick,
  onScrollComplete,
  children,
  ariaLabel,
}) => {
  // Validate variant for scroll-to-top mode (bar variant not allowed)
  if (mode === 'scroll-to-top' && variant === 'bar') {
    console.warn(
      '[ScrollProgressButton] Bar variant is not supported in scroll-to-top mode. Falling back to button variant.'
    );
  }

  // Determine effective variant (fallback if invalid combination)
  const effectiveVariant =
    mode === 'scroll-to-top' && variant === 'bar' ? 'button' : variant;

  // Smart defaults for shape based on mode
  const effectiveShape =
    shape ?? (mode === 'scroll-gated' ? 'rectangular' : 'circular');

  // Smart default for buttonText
  const effectiveButtonText =
    buttonText ??
    (mode === 'scroll-gated'
      ? effectiveVariant === 'button'
        ? 'Submit'
        : 'Accept' // 'Accept' for bar variant
      : undefined);
  // Track scroll progress (0-100%)
  const scrollProgress = useScrollProgress(container);

  // Detect motion preferences
  const prefersReducedMotion = useReducedMotion();

  // Track scroll completion for scroll-gated mode
  const [isScrollComplete, setIsScrollComplete] = useState(false);

  // Track button visibility for scroll-to-top mode
  const [isVisible, setIsVisible] = useState(mode === 'scroll-gated');

  // Determine button type based on mode
  const buttonType = type ?? (mode === 'scroll-gated' ? 'submit' : 'button');

  // Determine default aria label based on mode
  const defaultAriaLabel =
    mode === 'scroll-gated' ? 'Scroll to continue' : 'Scroll to top of page';
  const effectiveAriaLabel = ariaLabel ?? defaultAriaLabel;

  // Track scroll completion in scroll-gated mode
  useEffect(() => {
    if (mode === 'scroll-gated' && !isScrollComplete) {
      if (scrollProgress >= completionThreshold) {
        setIsScrollComplete(true);
        onScrollComplete?.();
      }
    }
  }, [
    mode,
    scrollProgress,
    completionThreshold,
    isScrollComplete,
    onScrollComplete,
  ]);

  // Update visibility for scroll-to-top mode
  useEffect(() => {
    if (mode === 'scroll-to-top') {
      const scrollElement = container || window;
      const isWindow = scrollElement === window;

      const checkVisibility = () => {
        const scrollTop = isWindow
          ? window.scrollY
          : (container?.scrollTop ?? 0);
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
    }
  }, [mode, container, threshold]);

  // Compute disabled state for scroll-gated mode
  const isDisabled =
    manualDisabled || (mode === 'scroll-gated' && !isScrollComplete);

  // Handle click based on mode
  const handleClick = useCallback(() => {
    // Don't do anything if disabled
    if (isDisabled) {
      return;
    }

    // Call custom onClick handler
    onClick?.();

    // In scroll-to-top mode, scroll to top
    if (mode === 'scroll-to-top') {
      const behavior = prefersReducedMotion ? 'auto' : 'smooth';
      const scrollElement = container || window;

      if (scrollElement === window) {
        window.scrollTo({ top: 0, behavior });
      } else if (container) {
        container.scrollTo({ top: 0, behavior });
      }
    }
  }, [isDisabled, mode, onClick, prefersReducedMotion, container]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Space bar always needs preventDefault (buttons don't handle Space natively)
      if (e.key === ' ') {
        e.preventDefault();
        handleClick();
        return;
      }

      // For Enter key: let submit buttons use native form submission
      if (e.key === 'Enter') {
        if (buttonType === 'submit') {
          // Don't preventDefault - let the browser handle form submission naturally
          // Don't call onClick here - the native button click behavior will trigger it
        } else {
          e.preventDefault();
          handleClick();
        }
      }
    },
    [handleClick, buttonType]
  );

  // Render appropriate variant
  if (effectiveVariant === 'bar') {
    return (
      <BarVariant
        progress={scrollProgress}
        isVisible={isVisible}
        prefersReducedMotion={prefersReducedMotion}
        className={className}
        ariaLabel={effectiveAriaLabel}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        type={buttonType}
        disabled={isDisabled}
        buttonText={effectiveButtonText}
        icon={icon}
        buttonColor={buttonColor}
        fillColor={fillColor}
        position={container ? 'absolute' : 'fixed'}
      >
        {children}
      </BarVariant>
    );
  }

  return (
    <ButtonVariant
      progress={scrollProgress}
      isVisible={isVisible}
      prefersReducedMotion={prefersReducedMotion}
      className={className}
      ariaLabel={effectiveAriaLabel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type={buttonType}
      disabled={isDisabled}
      shape={effectiveShape}
      buttonText={effectiveButtonText}
      icon={icon}
      buttonColor={buttonColor}
      fillColor={fillColor}
      position={mode === 'scroll-gated' ? 'inline' : 'fixed'}
    >
      {children}
    </ButtonVariant>
  );
};

ScrollProgressButton.displayName = 'ScrollProgressButton';
