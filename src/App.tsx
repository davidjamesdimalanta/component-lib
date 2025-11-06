import { useState } from 'react';
import { ScrollProgressButton } from './components/ScrollProgressButton';
import type {
  ScrollProgressButtonMode,
  ScrollProgressButtonVariant,
} from './components/ScrollProgressButton';
import { TermsOfServiceExample } from './examples/BasicExample';

function App() {
  const [mode, setMode] = useState<ScrollProgressButtonMode>('scroll-gated');
  const [variant, setVariant] = useState<ScrollProgressButtonVariant>('button');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Scroll Progress Button Demo</h1>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Mode Switcher */}
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Mode:
                </span>
                <button
                  onClick={() => {
                    setMode('scroll-gated');
                    setVariant('button');
                  }}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    mode === 'scroll-gated'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Scroll-Gated (Primary)
                </button>
                <button
                  onClick={() => {
                    setMode('scroll-to-top');
                    setVariant('button');
                  }}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    mode === 'scroll-to-top'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Scroll-to-Top (Legacy)
                </button>
              </div>

              {/* Variant Switcher */}
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Variant:
                </span>
                <button
                  onClick={() => setVariant('button')}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    variant === 'button'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Button
                </button>
                <button
                  onClick={() => setVariant('bar')}
                  disabled={mode === 'scroll-to-top'}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    variant === 'bar'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  } ${mode === 'scroll-to-top' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={
                    mode === 'scroll-to-top'
                      ? 'Bar variant not available for scroll-to-top mode'
                      : ''
                  }
                >
                  Bar
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-12">
        {mode === 'scroll-gated' ? (
          // Scroll-Gated Demo (Primary Use Case)
          <div>
            <section className="prose dark:prose-invert max-w-none mb-6 text-center">
              <h2>Scroll-Gated Mode (Primary Use Case)</h2>
              <p className="lead">
                Button disabled until user scrolls through content. Perfect for
                Terms of Service, content gates, and required reading.
              </p>
            </section>

            <TermsOfServiceExample variant={variant} />

            <section className="prose dark:prose-invert max-w-none mt-8 mx-auto">
              <h3>How It Works</h3>
              <ul>
                <li>
                  <strong>Disabled Until Scrolled:</strong> Button remains
                  disabled until 95% of content is read
                </li>
                <li>
                  <strong>Element Scroll Tracking:</strong> Tracks scroll within
                  the Terms of Service container, not window scroll
                </li>
                <li>
                  <strong>Form Submission:</strong> Button type defaults to
                  "submit" for easy form integration
                </li>
                <li>
                  <strong>Visual Feedback:</strong> Dark grey progress fill
                  provides clear visual indicator with better contrast
                </li>
                <li>
                  <strong>Button Set Pattern:</strong> Demonstrates Submit +
                  Cancel button layout for forms
                </li>
              </ul>

              <h3>Key Features</h3>
              <ul>
                <li>✅ Perfect for Terms of Service acceptance</li>
                <li>✅ Ensures users read important content</li>
                <li>✅ Fully accessible with ARIA disabled states</li>
                <li>✅ Customizable completion threshold (default 95%)</li>
                <li>✅ Dark color scheme with better contrast</li>
                <li>✅ Touch-friendly rectangular buttons (44px+ target)</li>
              </ul>
            </section>
          </div>
        ) : (
          // Scroll-to-Top Demo (Legacy Use Case)
          <section className="prose dark:prose-invert max-w-none">
            <h2>Scroll-to-Top Mode (Legacy)</h2>
            <p className="lead">
              Traditional scroll-to-top button behavior. Button appears after
              scrolling past a threshold and scrolls back to top when clicked.
            </p>

            <h3>Introduction</h3>
            <p>
              This is the classic scroll-to-top button pattern. As you scroll
              down, the button will appear in the{' '}
              {variant === 'button' ? 'bottom-right corner' : 'top of the page'}
              . Click it to smoothly scroll back to the top.
            </p>

            <h3>Features</h3>
            <ul>
              <li>Zero dependencies (only React and Tailwind CSS)</li>
              <li>
                Fully accessible with ARIA support and keyboard navigation
              </li>
              <li>
                Two variants: button (circular/rectangular) and horizontal
                progress bar
              </li>
              <li>GPU-accelerated animations for smooth performance</li>
              <li>Respects motion preferences (prefers-reduced-motion)</li>
              <li>Dark mode support via CSS custom properties</li>
              <li>Full TypeScript support with strict typing</li>
            </ul>

            <h3>Accessibility</h3>
            <p>Built with accessibility as a first-class concern:</p>
            <ul>
              <li>
                <strong>ARIA Support:</strong> Proper roles and attributes
                (progressbar, aria-valuenow, etc.)
              </li>
              <li>
                <strong>Keyboard Navigation:</strong> Fully navigable with Tab,
                Enter, and Space
              </li>
              <li>
                <strong>Screen Readers:</strong> Meaningful labels and progress
                announcements
              </li>
              <li>
                <strong>Motion Preferences:</strong> Respects
                prefers-reduced-motion setting
              </li>
              <li>
                <strong>Focus Management:</strong> Visible focus indicators and
                proper tab order
              </li>
            </ul>

            <h3>Performance</h3>
            <p>Optimized for performance using several techniques:</p>
            <ul>
              <li>
                <strong>requestAnimationFrame:</strong> Throttles scroll updates
                to 60fps
              </li>
              <li>
                <strong>GPU Acceleration:</strong> Uses CSS transforms (scaleX)
                instead of width
              </li>
              <li>
                <strong>Passive Event Listeners:</strong> Improves scrolling
                performance
              </li>
              <li>
                <strong>Minimal Re-renders:</strong> Optimized state updates
              </li>
            </ul>

            <h3>Browser Support</h3>
            <p>Supports all modern browsers:</p>
            <ul>
              <li>Chrome/Edge 90+ (April 2021)</li>
              <li>Firefox 88+ (April 2021)</li>
              <li>Safari 14+ (September 2020)</li>
              <li>iOS Safari 14+</li>
              <li>Samsung Internet 14+</li>
            </ul>

            {/* Extra content to make page scrollable */}
            <h3>Additional Section 1</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <h3>Additional Section 2</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <h3>Additional Section 3</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <h3>Additional Section 4</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>

            <h3>Conclusion</h3>
            <p>
              Try scrolling back to the top using the button. You can also test
              keyboard navigation by pressing Tab to focus the button, then
              Enter or Space to activate it.
            </p>
          </section>
        )}
      </main>

      {/* The scroll progress button component - only for scroll-to-top mode */}
      {mode === 'scroll-to-top' && (
        <ScrollProgressButton
          mode={mode}
          variant={variant}
          threshold={300}
          buttonColor="dark"
          fillColor="bg-gray-800"
        />
      )}
    </div>
  );
}

export default App;
