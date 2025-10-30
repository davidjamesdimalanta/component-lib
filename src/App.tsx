import { useState } from 'react';
import { ScrollProgressButton } from './components/ScrollProgressButton';
import type { ScrollProgressButtonVariant } from './components/ScrollProgressButton';

function App() {
  const [variant, setVariant] =
    useState<ScrollProgressButtonVariant>('circular');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Scroll Progress Button Demo</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setVariant('circular')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  variant === 'circular'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Circular
              </button>
              <button
                onClick={() => setVariant('bar')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  variant === 'bar'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Bar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            This is a demonstration of the Scroll Progress Button component.
            Scroll down to see the button appear and track your progress through
            the page.
          </p>

          <h2>Features</h2>
          <ul>
            <li>Zero dependencies (only React and Tailwind CSS)</li>
            <li>Fully accessible with ARIA support and keyboard navigation</li>
            <li>Two variants: circular button and horizontal progress bar</li>
            <li>GPU-accelerated animations for smooth performance</li>
            <li>Respects motion preferences (prefers-reduced-motion)</li>
            <li>Dark mode support via CSS custom properties</li>
            <li>Full TypeScript support with strict typing</li>
            <li>Configurable: page or section scroll tracking</li>
          </ul>

          <h2>How It Works</h2>
          <p>
            The component uses native browser APIs to track scroll position in
            real-time. As you scroll down the page, the progress indicator fills
            from left to right, showing you how far through the content you've
            scrolled. Click the button to smoothly scroll back to the top.
          </p>

          <h3>Circular Variant</h3>
          <p>
            The circular variant displays as a round button in the bottom-right
            corner. The progress is shown as a background fill that grows as you
            scroll. Perfect for minimal, unobtrusive designs.
          </p>

          <h3>Bar Variant</h3>
          <p>
            The bar variant appears as a thin horizontal line at the top or
            bottom of the viewport. The bar fills from left to right, providing
            a clear visual indicator of scroll progress. Ideal for reading
            experiences.
          </p>

          <h2>Accessibility</h2>
          <p>
            This component is built with accessibility as a first-class concern:
          </p>
          <ul>
            <li>
              <strong>ARIA Support:</strong> Uses proper ARIA roles and
              attributes (role="progressbar", aria-valuenow, etc.)
            </li>
            <li>
              <strong>Keyboard Navigation:</strong> Fully navigable with Tab,
              Enter, and Space keys
            </li>
            <li>
              <strong>Screen Readers:</strong> Provides meaningful labels and
              progress announcements
            </li>
            <li>
              <strong>Motion Preferences:</strong> Respects
              prefers-reduced-motion setting and disables animations when needed
            </li>
            <li>
              <strong>Focus Management:</strong> Visible focus indicators and
              proper tab order
            </li>
          </ul>

          <h2>Performance</h2>
          <p>
            The component is optimized for performance using several techniques:
          </p>
          <ul>
            <li>
              <strong>requestAnimationFrame:</strong> Throttles scroll updates
              to 60fps for smooth animations
            </li>
            <li>
              <strong>GPU Acceleration:</strong> Uses CSS transforms (scaleX)
              instead of width changes
            </li>
            <li>
              <strong>Passive Event Listeners:</strong> Improves scrolling
              performance
            </li>
            <li>
              <strong>Minimal Re-renders:</strong> Optimized state updates to
              reduce unnecessary renders
            </li>
          </ul>

          <h2>Implementation Details</h2>
          <p>The component consists of three main parts:</p>
          <ol>
            <li>
              <strong>useScrollProgress hook:</strong> Tracks scroll position
              and calculates progress percentage
            </li>
            <li>
              <strong>useReducedMotion hook:</strong> Detects user motion
              preferences
            </li>
            <li>
              <strong>ScrollProgressButton component:</strong> Renders the UI
              and handles user interactions
            </li>
          </ol>

          <h2>Browser Support</h2>
          <p>The component supports all modern browsers:</p>
          <ul>
            <li>Chrome/Edge 90+ (April 2021)</li>
            <li>Firefox 88+ (April 2021)</li>
            <li>Safari 14+ (September 2020)</li>
            <li>iOS Safari 14+</li>
            <li>Samsung Internet 14+</li>
          </ul>

          <h2>Usage Examples</h2>

          <h3>Default Usage</h3>
          <pre>
            <code>
              {`import { ScrollProgressButton } from '@/components/ScrollProgressButton';

export default function App() {
  return (
    <div>
      {/* Your content */}
      <ScrollProgressButton />
    </div>
  );
}`}
            </code>
          </pre>

          <h3>Custom Threshold</h3>
          <pre>
            <code>{`<ScrollProgressButton threshold={500} />`}</code>
          </pre>

          <h3>Bar Variant</h3>
          <pre>
            <code>{`<ScrollProgressButton variant="bar" />`}</code>
          </pre>

          <h3>Custom Container</h3>
          <pre>
            <code>
              {`const containerRef = useRef<HTMLDivElement>(null);

<div ref={containerRef} style={{ height: '500px', overflow: 'auto' }}>
  {/* Scrollable content */}
  <ScrollProgressButton container={containerRef.current} />
</div>`}
            </code>
          </pre>

          <h2>Conclusion</h2>
          <p>
            Try scrolling back to the top using the button in the{' '}
            {variant === 'circular' ? 'bottom right corner' : 'top of the page'}
            . You can also test keyboard navigation by pressing Tab to focus the
            button, then Enter or Space to activate it.
          </p>

          <p>
            The component demonstrates how to build accessible, performant React
            components using only native browser APIs and Tailwind CSS, without
            any external dependencies.
          </p>

          {/* Extra content to make page scrollable */}
          <h2>Additional Section 1</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <h2>Additional Section 2</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>

          <h2>Additional Section 3</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>

          <h2>Additional Section 4</h2>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
        </section>
      </main>

      {/* The scroll progress button component */}
      <ScrollProgressButton variant={variant} />
    </div>
  );
}

export default App;
