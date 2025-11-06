import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollProgressButton } from './ScrollProgressButton';

/**
 * Test suite for scroll-gated mode functionality
 * Tests the primary use case: button disabled until user scrolls through content
 */
describe('ScrollProgressButton - Scroll-Gated Mode', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000,
      writable: true,
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when scroll progress is below threshold', () => {
      render(
        <ScrollProgressButton mode="scroll-gated" completionThreshold={95} />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should have proper ARIA attributes when disabled', () => {
      render(
        <ScrollProgressButton mode="scroll-gated" completionThreshold={95} />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have disabled styling (disabledColor, cursor-not-allowed)', () => {
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="button"
          completionThreshold={95}
        />
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-stone-700');
      expect(button.className).toContain('cursor-not-allowed');
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <ScrollProgressButton
          mode="scroll-gated"
          completionThreshold={95}
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('should render as type="submit" by default in scroll-gated mode', () => {
      render(<ScrollProgressButton mode="scroll-gated" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should allow custom type override', () => {
      render(<ScrollProgressButton mode="scroll-gated" type="button" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should render as type="button" by default in scroll-to-top mode', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Completion Threshold', () => {
    it('should use default threshold of 95%', () => {
      render(<ScrollProgressButton mode="scroll-gated" />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should accept custom completionThreshold prop', () => {
      render(
        <ScrollProgressButton mode="scroll-gated" completionThreshold={80} />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('onScrollComplete Callback', () => {
    it('should have onScrollComplete prop available', () => {
      const handleComplete = vi.fn();

      render(
        <ScrollProgressButton
          mode="scroll-gated"
          completionThreshold={95}
          onScrollComplete={handleComplete}
        />
      );

      // Component renders successfully with callback
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Mode Switching', () => {
    it('should not disable button in scroll-to-top mode', () => {
      // Set scroll position to trigger visibility
      window.scrollY = 400;

      render(<ScrollProgressButton mode="scroll-to-top" />);

      // Wait for visibility check
      waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();
      });
    });

    it('should render as type="button" in scroll-to-top mode by default', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should render as type="submit" in scroll-gated mode by default', () => {
      render(<ScrollProgressButton mode="scroll-gated" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Manual Disabled Override', () => {
    it('should respect manual disabled prop', () => {
      render(<ScrollProgressButton mode="scroll-gated" disabled={true} />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should allow manual disabled to override scroll completion', () => {
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          completionThreshold={0}
          disabled={true}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Variants', () => {
    it('should render button variant with circular shape in scroll-gated mode', () => {
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="button"
          shape="circular"
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-full');
      expect(button).toBeDisabled();
    });

    it('should render button variant with rectangular shape (default) in scroll-gated mode', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="button" />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-lg');
      expect(button).toBeDisabled();
    });

    it('should render bar variant in scroll-gated mode', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="bar" />);

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('fixed', 'top-0');
    });
  });

  describe('ARIA Labels', () => {
    it('should have scroll-gated specific default aria-label', () => {
      render(<ScrollProgressButton mode="scroll-gated" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Scroll to continue');
    });

    it('should have scroll-to-top specific default aria-label', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Scroll to top of page');
    });

    it('should allow custom aria-label override', () => {
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          ariaLabel="Accept terms and continue"
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Accept terms and continue');
    });
  });

  describe('Children Content', () => {
    it('should render custom children in scroll-gated mode', () => {
      render(
        <ScrollProgressButton mode="scroll-gated" variant="button">
          Accept & Continue
        </ScrollProgressButton>
      );

      expect(screen.getByText('Accept & Continue')).toBeInTheDocument();
    });

    it('should render default icon in scroll-to-top mode when no children', () => {
      render(<ScrollProgressButton mode="scroll-to-top" variant="button" />);

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Visibility', () => {
    it('should always be visible in scroll-gated mode', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="button" />);

      const button = screen.getByRole('button');
      // In scroll-gated mode, button should be visible (not have opacity-0)
      // even though it may be disabled
      expect(button.className).toContain('opacity-100');
    });
  });
});
