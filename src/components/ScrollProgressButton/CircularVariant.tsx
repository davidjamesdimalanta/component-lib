import React from 'react';

interface CircularVariantProps {
  progress: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  className?: string;
  ariaLabel: string;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  children?: React.ReactNode;
}

/**
 * Circular button variant for scroll progress
 * Displays as a round button in the bottom-right corner
 */
export const CircularVariant: React.FC<CircularVariantProps> = ({
  progress,
  isVisible,
  prefersReducedMotion,
  className = '',
  ariaLabel,
  onClick,
  onKeyDown,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={isVisible ? 0 : -1}
      aria-label={ariaLabel}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        flex items-center justify-center
        bg-primary text-primary-foreground
        shadow-lg hover:shadow-xl
        transition-all duration-300
        motion-reduce:transition-none
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring
        ${!isVisible ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}
        ${prefersReducedMotion ? 'motion-reduce:duration-0' : ''}
        ${className}
      `}
      style={{
        transition: prefersReducedMotion ? 'none' : undefined,
      }}
    >
      {/* Progress indicator background */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className="absolute inset-0 bg-accent origin-left"
          style={{
            transform: `scaleX(${progress / 100})`,
            transformOrigin: 'left',
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 0.1s ease-out',
          }}
        />
      </div>

      {/* Button content (icon) */}
      <div className="relative z-10">
        {children || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        )}
      </div>

      {/* Screen reader only progress announcement */}
      <span className="sr-only">Scroll progress: {Math.round(progress)}%</span>
    </button>
  );
};
