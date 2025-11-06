import React from 'react';
import type { ColorPreset } from './ScrollProgressButton.types';

interface BarVariantProps {
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
  buttonText?: string;
  icon?: React.ReactNode;
  buttonColor?: ColorPreset | string;
  fillColor?: string;
  position?: 'fixed' | 'absolute';
}

/**
 * Horizontal bar variant for scroll progress
 * Displays as a horizontal bar with text content at the top or bottom of viewport
 */
export const BarVariant: React.FC<BarVariantProps> = ({
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
  buttonText = 'Accept',
  icon,
  buttonColor = 'primary',
  fillColor,
  position = 'fixed',
}) => {
  // Position classes based on position prop
  const positionClasses =
    position === 'absolute'
      ? 'absolute bottom-0 left-0 right-0' // Bottom of container
      : 'fixed top-0 left-0 right-0 z-50'; // Top of viewport

  // Map color presets to Tailwind classes
  const getButtonColorClass = (color: ColorPreset | string): string => {
    switch (color) {
      case 'dark':
        return 'bg-gray-900 text-white';
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
        return 'bg-gray-700';
      case 'primary':
        return 'bg-accent';
      case 'secondary':
        return 'bg-accent';
      default:
        return 'bg-gray-700';
    }
  };

  const buttonColorClass = getButtonColorClass(buttonColor);
  const fillColorClass = getFillColorClass(fillColor, buttonColor);

  // Determine content to display
  const content = children || (
    <>
      {icon && (
        <span className="inline-flex items-center justify-center">{icon}</span>
      )}
      {buttonText && <span className={icon ? 'ml-2' : ''}>{buttonText}</span>}
    </>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      tabIndex={isVisible ? 0 : -1}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`
        ${positionClasses}
        min-h-[2.75rem]
        px-6 py-3
        flex items-center justify-center
        ${buttonColorClass}
        font-medium text-sm
        transition-all duration-300
        motion-reduce:transition-none
        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring
        ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${prefersReducedMotion ? 'motion-reduce:duration-0' : ''}
        ${className}
      `}
      style={{
        transition: prefersReducedMotion ? 'none' : undefined,
      }}
    >
      {/* Progress fill - fills from left to right behind content */}
      <div
        className={`absolute top-0 left-0 bottom-0 ${fillColorClass}`}
        style={{
          width: `${progress}%`,
          transition: prefersReducedMotion ? 'none' : 'width 0.1s ease-out',
        }}
        aria-hidden="true"
      />

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {content}
      </div>

      {/* Screen reader only progress announcement */}
      <span className="sr-only">
        Scroll progress: {Math.round(progress)}%.
        {disabled ? ' Scroll to enable.' : ' Click to continue.'}
      </span>
    </button>
  );
};
