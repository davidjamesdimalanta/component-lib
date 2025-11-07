import React from 'react';
import type { ButtonShape, ColorPreset } from './ScrollProgressButton.types';

interface ButtonVariantProps {
  progress: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  className?: string;
  ariaLabel: string;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
  children?: React.ReactNode;
  shape?: ButtonShape;
  buttonText?: string;
  icon?: React.ReactNode;
  buttonColor?: ColorPreset | string;
  disabledColor?: string;
  fillColor?: string;
  position?: 'fixed' | 'inline';
}

/**
 * Button variant for scroll progress
 * Displays as a button in the bottom-right corner (circular or rectangular)
 */
export const ButtonVariant: React.FC<ButtonVariantProps> = ({
  progress,
  isVisible,
  prefersReducedMotion,
  className = '',
  ariaLabel,
  onClick,
  onKeyDown,
  type = 'button',
  disabled = false,
  children,
  shape = 'rectangular',
  buttonText,
  icon,
  buttonColor = 'bg-black',
  disabledColor = 'bg-stone-700',
  fillColor,
  position = 'fixed',
}) => {
  // Map color presets to Tailwind classes
  const getButtonColorClass = (color: ColorPreset | string): string => {
    switch (color) {
      case 'dark':
        return 'bg-gray-800 text-white';
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      default:
        // Custom Tailwind class or arbitrary value
        return color.includes('bg-') ? `${color} text-white` : color;
    }
  };

  const getFillColorClass = (
    fill: string | undefined,
    buttonColorValue: ColorPreset | string
  ): string => {
    if (fill) {
      return fill.includes('bg-') ? fill : `bg-${fill}`;
    }
    // Default fill colors based on button color
    switch (buttonColorValue) {
      case 'dark':
        return 'bg-black';
      case 'primary':
        return 'bg-accent';
      case 'secondary':
        return 'bg-accent';
      default:
        return 'bg-black';
    }
  };

  const buttonColorClass = disabled
    ? `${disabledColor} text-stone-300`
    : getButtonColorClass(buttonColor);
  const fillColorClass = getFillColorClass(fillColor, buttonColor);

  // Determine size and shape classes
  const isCircular = shape === 'circular';
  const sizeClasses = isCircular
    ? 'w-14 h-14 rounded-full'
    : 'min-w-[11rem] min-h-[2.75rem] px-6 py-3 rounded-lg';

  // Determine content to display
  const content = children || (
    <>
      {icon && (
        <span className="inline-flex items-center justify-center">{icon}</span>
      )}
      {buttonText && <span className={icon ? 'ml-2' : ''}>{buttonText}</span>}
      {!icon && !buttonText && (
        // Default up-arrow icon for backward compatibility
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
    </>
  );
  // Position classes based on position prop
  const positionClasses =
    position === 'fixed' ? 'fixed bottom-6 right-6 z-50' : 'relative';

  return (
    <button
      type={type}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      tabIndex={isVisible ? 0 : -1}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={`
        ${positionClasses}
        ${sizeClasses}
        flex items-center justify-center gap-2
        ${buttonColorClass}
        shadow-lg hover:shadow-xl
        transition-all duration-300
        motion-reduce:transition-none
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring
        ${!isVisible ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}
        ${disabled ? 'cursor-not-allowed hover:shadow-lg' : 'cursor-pointer'}
        ${prefersReducedMotion ? 'motion-reduce:duration-0' : ''}
        ${className}
      `}
      style={{
        transition: prefersReducedMotion ? 'none' : undefined,
      }}
    >
      {/* Progress indicator background */}
      <div
        className={`absolute inset-0 overflow-hidden ${isCircular ? 'rounded-full' : 'rounded-lg'}`}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className={`absolute inset-0 ${fillColorClass} origin-left`}
          style={{
            transform: `scaleX(${progress / 100}) translateZ(0)`,
            transformOrigin: 'left',
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 0.1s ease-out',
            willChange: prefersReducedMotion ? 'auto' : 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      </div>

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {content}
      </div>

      {/* Screen reader only progress announcement */}
      <span className="sr-only">Scroll progress: {Math.round(progress)}%</span>
    </button>
  );
};
