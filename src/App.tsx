import { useState } from 'react';
import {
  TermsOfServiceExample,
  ControlToSExample,
  ContentGateExample,
  CustomThresholdGatedExample,
  BarVariantWithIconExample,
  ScrollToTopExample,
  BarScrollToTopExample,
  CustomContainerExample,
  CustomOnClickExample,
  ReducedMotionExample,
} from './examples/BasicExample';
import { UserTest } from './pages/UserTest';

type ExampleType =
  | 'terms-of-service'
  | 'control-tos'
  | 'content-gate'
  | 'custom-threshold'
  | 'bar-with-icon'
  | 'scroll-to-top'
  | 'bar-scroll-to-top'
  | 'custom-container'
  | 'custom-onclick'
  | 'reduced-motion'
  | 'user-test';

function App() {
  const [selectedExample, setSelectedExample] = useState<ExampleType | null>(
    null
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                Scroll Progress Button Demo
              </h1>
              <button
                onClick={() => setSelectedExample(null)}
                className="px-4 py-2 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                View Examples
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-12">
        {selectedExample === null ? (
          // Example Gallery
          <div className="max-w-4xl mx-auto">
            <section className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Choose an Example</h2>
              <p className="text-muted-foreground">
                Select an example below to see the ScrollProgressButton in
                action
              </p>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              {/* User Testing - Featured */}
              <div className="md:col-span-2 border-2 border-purple-500 rounded-lg p-6 bg-gradient-to-r from-purple-50 to-blue-50 hover:border-purple-600 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">A/B User Testing</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-500 text-white">
                    Research
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete A/B test comparing control button vs. progress bar.
                  Includes metrics tracking, console logging, and data export
                  (JSON/CSV).
                </p>
                <button
                  onClick={() => setSelectedExample('user-test')}
                  className="w-full px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
                >
                  Start User Test
                </button>
              </div>

              {/* Scroll-Gated Examples */}
              <div className="border rounded-lg p-6 bg-card hover:border-primary transition-colors">
                <h3 className="text-xl font-semibold mb-2">Terms of Service</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Button disabled until user scrolls through ToS content
                </p>
                <button
                  onClick={() => setSelectedExample('terms-of-service')}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Example
                </button>
              </div>

              <div className="border-2 border-orange-500 rounded-lg p-6 bg-card hover:border-orange-600 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">ToS Control</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-orange-500 text-white">
                    Control
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Traditional disabled/enabled button without progress indicator
                </p>
                <button
                  onClick={() => setSelectedExample('control-tos')}
                  className="w-full px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
                >
                  View Example
                </button>
              </div>

              <div className="border rounded-lg p-6 bg-card hover:border-primary transition-colors">
                <h3 className="text-xl font-semibold mb-2">Content Gate</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Educational content with completion tracking
                </p>
                <button
                  onClick={() => setSelectedExample('content-gate')}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Example
                </button>
              </div>

              <div className="border rounded-lg p-6 bg-card hover:border-primary transition-colors">
                <h3 className="text-xl font-semibold mb-2">
                  Custom Threshold (80%)
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Button enables after scrolling 80% of content
                </p>
                <button
                  onClick={() => setSelectedExample('custom-threshold')}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Example
                </button>
              </div>

              <div className="border rounded-lg p-6 bg-card hover:border-primary transition-colors">
                <h3 className="text-xl font-semibold mb-2">
                  Bar Variant with Icon
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Bar variant with icon and custom text
                </p>
                <button
                  onClick={() => setSelectedExample('bar-with-icon')}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Example
                </button>
              </div>

              {/* Accessibility Example */}
              <div className="border-2 border-blue-500 rounded-lg p-6 bg-card hover:border-blue-600 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">Reduced Motion</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">
                    Accessibility
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Automatic reduced motion support with live preference
                  detection
                </p>
                <button
                  onClick={() => setSelectedExample('reduced-motion')}
                  className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  View Example
                </button>
              </div>

              {/* Legacy Examples */}
              <div className="border rounded-lg p-6 bg-card hover:border-primary transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">Scroll to Top</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500 text-white">
                    Legacy
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Traditional scroll-to-top button behavior
                </p>
                <button
                  onClick={() => setSelectedExample('scroll-to-top')}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Example
                </button>
              </div>

              <div className="border rounded-lg p-6 bg-card hover:border-primary transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">Bar Scroll to Top</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500 text-white">
                    Legacy
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Progress bar at top showing scroll progress
                </p>
                <button
                  onClick={() => setSelectedExample('bar-scroll-to-top')}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Example
                </button>
              </div>

              <div className="border rounded-lg p-6 bg-card hover:border-primary transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">Custom Container</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500 text-white">
                    Legacy
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Tracks scroll within a container, not the page
                </p>
                <button
                  onClick={() => setSelectedExample('custom-container')}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Example
                </button>
              </div>

              <div className="border rounded-lg p-6 bg-card hover:border-primary transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">Custom onClick</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500 text-white">
                    Legacy
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Button with custom click handler
                </p>
                <button
                  onClick={() => setSelectedExample('custom-onclick')}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Example
                </button>
              </div>
            </div>
          </div>
        ) : selectedExample === 'terms-of-service' ? (
          <TermsOfServiceExample />
        ) : selectedExample === 'control-tos' ? (
          <ControlToSExample />
        ) : selectedExample === 'content-gate' ? (
          <ContentGateExample />
        ) : selectedExample === 'custom-threshold' ? (
          <CustomThresholdGatedExample />
        ) : selectedExample === 'bar-with-icon' ? (
          <BarVariantWithIconExample />
        ) : selectedExample === 'reduced-motion' ? (
          <ReducedMotionExample />
        ) : selectedExample === 'scroll-to-top' ? (
          <ScrollToTopExample />
        ) : selectedExample === 'bar-scroll-to-top' ? (
          <BarScrollToTopExample />
        ) : selectedExample === 'custom-container' ? (
          <CustomContainerExample />
        ) : selectedExample === 'custom-onclick' ? (
          <CustomOnClickExample />
        ) : selectedExample === 'user-test' ? (
          <UserTest />
        ) : null}
      </main>
    </div>
  );
}

export default App;
