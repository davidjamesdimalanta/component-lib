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
      render(<ScrollProgressButton mode="scroll-to-top" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders button variant with circular shape by default for scroll-to-top', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-full');
    });

    it('renders bar variant when specified for scroll-gated mode', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="bar" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
      expect(progressbar).toHaveClass('min-h-[2.75rem]'); // 44px for accessibility
    });

    it('applies custom className', () => {
      render(
        <ScrollProgressButton mode="scroll-to-top" className="custom-class" />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders custom children for button variant', () => {
      render(
        <ScrollProgressButton mode="scroll-to-top">
          <span data-testid="custom-icon">↑</span>
        </ScrollProgressButton>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('initially has opacity-0 (hidden)', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('opacity-0');
    });
  });

  describe('Scroll Tracking', () => {
    it('shows button after scrolling past threshold', async () => {
      render(<ScrollProgressButton mode="scroll-to-top" threshold={300} />);
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
      render(<ScrollProgressButton mode="scroll-to-top" threshold={500} />);
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

      render(<ScrollProgressButton mode="scroll-to-top" />);

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

      render(<ScrollProgressButton mode="scroll-to-top" threshold={300} />);

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

      render(
        <ScrollProgressButton
          mode="scroll-to-top"
          onClick={onClickMock}
          threshold={300}
        />
      );

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

      render(<ScrollProgressButton mode="scroll-to-top" threshold={300} />);

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

      render(<ScrollProgressButton mode="scroll-to-top" threshold={300} />);

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
      render(<ScrollProgressButton mode="scroll-to-top" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Scroll to top of page');
    });

    it('uses custom aria-label when provided', () => {
      render(
        <ScrollProgressButton mode="scroll-to-top" ariaLabel="Back to top" />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Back to top');
    });

    it('has role="progressbar" on progress element', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('has aria-valuenow attribute', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow');
    });

    it('has aria-valuemin and aria-valuemax', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);
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

      render(<ScrollProgressButton mode="scroll-to-top" />);

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
      render(<ScrollProgressButton mode="scroll-to-top" threshold={300} />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('tabIndex', '0');
      });
    });

    it('is not focusable when hidden (tabIndex=-1)', () => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      render(<ScrollProgressButton mode="scroll-to-top" threshold={300} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('has visible focus indicator', () => {
      render(<ScrollProgressButton mode="scroll-to-top" />);
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

      render(<ScrollProgressButton mode="scroll-to-top" threshold={300} />);

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
      render(<ScrollProgressButton mode="scroll-to-top" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('motion-reduce:transition-none');
    });
  });

  describe('Variants', () => {
    it('renders circular variant correctly', () => {
      render(<ScrollProgressButton mode="scroll-to-top" variant="button" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-full');
      expect(button).toHaveClass('bottom-6');
      expect(button).toHaveClass('right-6');
    });

    it('renders bar variant correctly for scroll-gated mode', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="bar" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('top-0');
      expect(progressbar).toHaveClass('min-h-[2.75rem]'); // 44px for accessibility
    });

    it('falls back to button variant when bar is used with scroll-to-top', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<ScrollProgressButton mode="scroll-to-top" variant="bar" />);

      // Should render button variant instead
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('rounded-full'); // circular shape by default for scroll-to-top

      // Should warn about invalid combination
      expect(consoleSpy).toHaveBeenCalledWith(
        '[ScrollProgressButton] Bar variant is not supported in scroll-to-top mode. Falling back to button variant.'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Bar Variant Text Functionality', () => {
    it('renders default "Accept" text in bar variant', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="bar" />);
      expect(screen.getByText('Accept')).toBeInTheDocument();
    });

    it('renders custom buttonText in bar variant', () => {
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="bar"
          buttonText="Continue"
        />
      );
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('renders icon with text in bar variant', () => {
      const TestIcon = () => <span data-testid="test-icon">✓</span>;
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="bar"
          buttonText="Agree"
          icon={<TestIcon />}
        />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Agree')).toBeInTheDocument();
    });

    it('children override buttonText and icon in bar variant', () => {
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="bar"
          buttonText="Should not appear"
          icon={<span>Icon</span>}
        >
          <span data-testid="custom-content">Custom Content</span>
        </ScrollProgressButton>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
    });

    it('bar variant meets 44px minimum touch target height', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="bar" />);
      const progressbar = screen.getByRole('progressbar');
      // Check for min-h-[2.75rem] class (2.75rem = 44px)
      expect(progressbar).toHaveClass('min-h-[2.75rem]');
    });

    it('bar variant has proper padding for text', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="bar" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('px-6');
      expect(progressbar).toHaveClass('py-3');
    });

    it('bar variant applies buttonColor correctly', () => {
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="bar"
          buttonColor="dark"
        />
      );
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('bg-gray-900');
    });

    it('bar variant is keyboard accessible', async () => {
      // Mock document dimensions for scroll calculation
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        value: 2000,
        writable: true,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 1000,
        writable: true,
      });

      const onClickMock = vi.fn();
      const onScrollCompleteMock = vi.fn();

      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="bar"
          completionThreshold={80}
          onClick={onClickMock}
          onScrollComplete={onScrollCompleteMock}
        />
      );

      // Initially should be disabled
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('disabled');

      // Scroll to 90% to enable the button (above 80% threshold)
      Object.defineProperty(window, 'scrollY', { value: 900, writable: true });
      fireEvent.scroll(window);

      // Wait for scroll completion callback to be called
      await waitFor(() => {
        expect(onScrollCompleteMock).toHaveBeenCalled();
      });

      // Wait for button to be enabled
      await waitFor(() => {
        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).not.toHaveAttribute('disabled');
      });

      // Get the enabled button
      const enabledProgressbar = screen.getByRole('progressbar');

      // Focus the button first
      enabledProgressbar.focus();
      expect(enabledProgressbar).toHaveFocus();

      // Test Enter key
      await userEvent.keyboard('{Enter}');
      expect(onClickMock).toHaveBeenCalledTimes(1);

      // Test Space key
      await userEvent.keyboard(' ');
      expect(onClickMock).toHaveBeenCalledTimes(2);
    });

    it('bar variant has visible focus indicator', () => {
      render(<ScrollProgressButton mode="scroll-gated" variant="bar" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('focus:ring-2');
    });
  });

  describe('Button Variant Keyboard Accessibility', () => {
    it('button variant is keyboard accessible in scroll-gated mode', async () => {
      // Mock document dimensions for scroll calculation
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        value: 2000,
        writable: true,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 1000,
        writable: true,
      });

      const onClickMock = vi.fn();
      const onScrollCompleteMock = vi.fn();

      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="button"
          shape="rectangular"
          buttonText="Submit"
          completionThreshold={80}
          onClick={onClickMock}
          onScrollComplete={onScrollCompleteMock}
        />
      );

      // Initially should be disabled
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');

      // Scroll to 90% to enable the button (above 80% threshold)
      Object.defineProperty(window, 'scrollY', { value: 900, writable: true });
      fireEvent.scroll(window);

      // Wait for scroll completion callback to be called
      await waitFor(() => {
        expect(onScrollCompleteMock).toHaveBeenCalled();
      });

      // Wait for button to be enabled
      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).not.toHaveAttribute('disabled');
      });

      // Get the enabled button
      const enabledButton = screen.getByRole('button');

      // Focus the button first
      enabledButton.focus();
      expect(enabledButton).toHaveFocus();

      // Test Enter key
      await userEvent.keyboard('{Enter}');
      expect(onClickMock).toHaveBeenCalledTimes(1);

      // Test Space key
      await userEvent.keyboard(' ');
      expect(onClickMock).toHaveBeenCalledTimes(2);
    });

    it('button variant keyboard events are blocked when disabled', async () => {
      const onClickMock = vi.fn();

      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="button"
          buttonText="Submit"
          completionThreshold={95}
          onClick={onClickMock}
        />
      );

      const button = screen.getByRole('button');
      button.focus();

      // Try to trigger keyboard events while disabled
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');

      // onClick should not have been called
      expect(onClickMock).not.toHaveBeenCalled();
    });

    it('button variant has visible focus indicator', () => {
      render(
        <ScrollProgressButton
          mode="scroll-gated"
          variant="button"
          buttonText="Submit"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:ring-2');
    });

    it('button variant circular shape is keyboard accessible', async () => {
      // Mock scroll position above threshold
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true });

      const onClickMock = vi.fn();

      render(
        <ScrollProgressButton
          mode="scroll-to-top"
          variant="button"
          shape="circular"
          threshold={300}
          onClick={onClickMock}
        />
      );

      // Wait for button to appear
      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('opacity-100');
      });

      const button = screen.getByRole('button');
      button.focus();

      // Test keyboard interaction
      await userEvent.keyboard('{Enter}');
      expect(onClickMock).toHaveBeenCalledOnce();
    });
  });
});
