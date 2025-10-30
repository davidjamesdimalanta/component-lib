import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollProgressButton } from './ScrollProgressButton';

describe('ScrollProgressButton', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ScrollProgressButton />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders circular variant by default', () => {
      render(<ScrollProgressButton />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-full');
    });

    it('renders bar variant when specified', () => {
      render(<ScrollProgressButton variant="bar" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
      expect(progressbar).toHaveClass('h-1');
    });

    it('applies custom className', () => {
      render(<ScrollProgressButton className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders custom children for circular variant', () => {
      render(
        <ScrollProgressButton>
          <span data-testid="custom-icon">↑</span>
        </ScrollProgressButton>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('initially has opacity-0 (hidden)', () => {
      render(<ScrollProgressButton />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('opacity-0');
    });
  });

  describe('Scroll Tracking', () => {
    it('shows button after scrolling past threshold', async () => {
      render(<ScrollProgressButton threshold={300} />);
      const button = screen.getByRole('button');

      // Initially hidden
      expect(button).toHaveClass('opacity-0');

      // Simulate scroll past threshold
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        expect(button).toHaveClass('opacity-100');
      });
    });

    it('uses custom threshold when provided', async () => {
      render(<ScrollProgressButton threshold={500} />);
      const button = screen.getByRole('button');

      // Scroll to 400px (below threshold)
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      fireEvent.scroll(window);

      // Should still be hidden
      expect(button).toHaveClass('opacity-0');

      // Scroll to 600px (above threshold)
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        expect(button).toHaveClass('opacity-100');
      });
    });

    it('updates progress percentage correctly', async () => {
      // Mock document dimensions
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        value: 2000,
        writable: true,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 1000,
        writable: true,
      });

      render(<ScrollProgressButton />);

      // Scroll to 50% (500px of 1000px scrollable)
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toHaveAttribute('aria-valuenow', '50');
      });
    });
  });

  describe('Interactions', () => {
    it('scrolls to top on click', async () => {
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;

      // Start with scroll position > threshold
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });

      render(<ScrollProgressButton threshold={300} />);

      // Wait for button to appear
      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('opacity-100');
      });

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(scrollToMock).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('calls custom onClick handler', async () => {
      const onClickMock = vi.fn();
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });

      render(<ScrollProgressButton onClick={onClickMock} threshold={300} />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('opacity-100');
      });

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(onClickMock).toHaveBeenCalledOnce();
    });

    it('responds to Enter key', async () => {
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });

      render(<ScrollProgressButton threshold={300} />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('opacity-100');
      });

      const button = screen.getByRole('button');
      button.focus();
      fireEvent.keyDown(button, { key: 'Enter' });

      expect(scrollToMock).toHaveBeenCalled();
    });

    it('responds to Space key', async () => {
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });

      render(<ScrollProgressButton threshold={300} />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('opacity-100');
      });

      const button = screen.getByRole('button');
      button.focus();
      fireEvent.keyDown(button, { key: ' ' });

      expect(scrollToMock).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has aria-label', () => {
      render(<ScrollProgressButton />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Scroll to top of page');
    });

    it('uses custom aria-label when provided', () => {
      render(<ScrollProgressButton ariaLabel="Back to top" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Back to top');
    });

    it('has role="progressbar" on progress element', () => {
      render(<ScrollProgressButton />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('has aria-valuenow attribute', () => {
      render(<ScrollProgressButton />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow');
    });

    it('has aria-valuemin and aria-valuemax', () => {
      render(<ScrollProgressButton />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('updates aria-valuenow with scroll', async () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        value: 2000,
        writable: true,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 1000,
        writable: true,
      });

      render(<ScrollProgressButton />);

      // Scroll to 25%
      Object.defineProperty(window, 'scrollY', { value: 250, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toHaveAttribute('aria-valuenow', '25');
      });
    });

    it('is focusable when visible (tabIndex=0)', async () => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      render(<ScrollProgressButton threshold={300} />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('tabIndex', '0');
      });
    });

    it('is not focusable when hidden (tabIndex=-1)', () => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      render(<ScrollProgressButton threshold={300} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('has visible focus indicator', () => {
      render(<ScrollProgressButton />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:ring-2');
    });
  });

  describe('Motion Preferences', () => {
    it('uses auto scroll behavior when motion reduced', async () => {
      // Mock matchMedia to return reduced motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });

      render(<ScrollProgressButton threshold={300} />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('opacity-100');
      });

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(scrollToMock).toHaveBeenCalledWith({
        top: 0,
        behavior: 'auto',
      });
    });

    it('applies motion-reduce classes', () => {
      render(<ScrollProgressButton />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('motion-reduce:transition-none');
    });
  });

  describe('Variants', () => {
    it('renders circular variant correctly', () => {
      render(<ScrollProgressButton variant="circular" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-full');
      expect(button).toHaveClass('bottom-6');
      expect(button).toHaveClass('right-6');
    });

    it('renders bar variant correctly', () => {
      render(<ScrollProgressButton variant="bar" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('top-0');
      expect(progressbar).toHaveClass('h-1');
    });
  });
});
