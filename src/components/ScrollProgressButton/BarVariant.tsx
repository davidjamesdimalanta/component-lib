import React from 'react';

interface BarVariantProps {
  progress: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  className?: string;
  ariaLabel: string;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Horizontal bar variant for scroll progress
 * Displays as a thin progress bar at the top of the viewport
 */
export const BarVariant: React.FC<BarVariantProps> = ({
  progress,
  isVisible,
  prefersReducedMotion,
  className = '',
  ariaLabel,
  onClick,
  onKeyDown,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={isVisible ? 0 : -1}
      aria-label={ariaLabel}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`
        fixed top-0 left-0 right-0 z-50
        h-1 cursor-pointer
        transition-all duration-300
        motion-reduce:transition-none
        hover:h-2
        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring
        ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${prefersReducedMotion ? 'motion-reduce:duration-0' : ''}
        ${className}
      `}
      style={{
        transition: prefersReducedMotion ? 'none' : undefined,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-secondary" aria-hidden="true" />

      {/* Progress fill */}
      <div
        className="absolute top-0 left-0 bottom-0 bg-primary"
        style={{
          width: `${progress}%`,
          transition: prefersReducedMotion ? 'none' : 'width 0.1s ease-out',
        }}
        aria-hidden="true"
      />

      {/* Screen reader only progress announcement */}
      <span className="sr-only">
        Scroll progress: {Math.round(progress)}%. Click to scroll to top.
      </span>
    </button>
  );
};
