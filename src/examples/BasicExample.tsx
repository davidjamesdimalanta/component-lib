import React, { useState, useCallback, useRef } from 'react';
import { ScrollProgressButton } from '../components/ScrollProgressButton';
import type { ScrollProgressButtonVariant } from '../components/ScrollProgressButton';

/**
 * PRIMARY USE CASE: Terms of Service Form (Scroll-Gated)
 * Button disabled until user scrolls through ToS content
 */
interface TermsOfServiceExampleProps {
  variant?: ScrollProgressButtonVariant;
}

export const TermsOfServiceExample: React.FC<TermsOfServiceExampleProps> = ({
  variant = 'button'
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const handleContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer(node);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terms accepted! Form submitted.');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4 text-muted-foreground">
        Please read and scroll through the entire terms to enable the submit
        button
      </p>

      <form onSubmit={handleSubmit}>
        {/* Wrapper for relative positioning of bar variant */}
        <div className="relative mb-6">
          <div
            ref={handleContainerRef}
            className="border rounded-lg p-6 h-96 overflow-y-auto bg-card"
          >
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using this service, you accept and agree to be
            bound by the terms and provision of this agreement. If you do not
            agree to these terms, you should not use this service.
          </p>

          <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily download one copy of the
            materials on this website for personal, non-commercial transitory
            viewing only. This is the grant of a license, not a transfer of
            title.
          </p>

          <h2 className="text-xl font-semibold mb-3">3. Disclaimer</h2>
          <p className="mb-4">
            The materials on this website are provided on an 'as is' basis. We
            make no warranties, expressed or implied, and hereby disclaim and
            negate all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>

          <h2 className="text-xl font-semibold mb-3">4. Limitations</h2>
          <p className="mb-4">
            In no event shall our company or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on our website.
          </p>

          <h2 className="text-xl font-semibold mb-3">
            5. Accuracy of Materials
          </h2>
          <p className="mb-4">
            The materials appearing on our website could include technical,
            typographical, or photographic errors. We do not warrant that any of
            the materials on our website are accurate, complete, or current.
          </p>

          <h2 className="text-xl font-semibold mb-3">6. Links</h2>
          <p className="mb-4">
            We have not reviewed all of the sites linked to our website and are
            not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by us of the site.
          </p>

          <h2 className="text-xl font-semibold mb-3">7. Modifications</h2>
          <p className="mb-4">
            We may revise these terms of service for our website at any time
            without notice. By using this website you are agreeing to be bound
            by the then current version of these terms of service.
          </p>

          <h2 className="text-xl font-semibold mb-3">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws and you irrevocably submit to the exclusive
            jurisdiction of the courts in that location.
          </p>
          </div>

          {/* Bar variant positioned absolutely at bottom of container */}
          {variant === 'bar' && (
            <ScrollProgressButton
              mode="scroll-gated"
              variant="bar"
              buttonText="Accept Terms"
              buttonColor="dark"
              fillColor="bg-gray-700"
              container={container}
              completionThreshold={95}
            />
          )}
        </div>

        {/* Button set below scrollable container - only for button variant */}
        {variant === 'button' && (
          <div className="flex gap-4">
            <ScrollProgressButton
              mode="scroll-gated"
              variant="button"
              shape="rectangular"
              buttonText="Accept"
              buttonColor="bg-[#2b2b2b]"
              fillColor="bg-[#000000]"
              container={container}
              completionThreshold={100}
              className="flex-1"
            />
            <button
              type="button"
              className="px-6 py-3 min-h-[2.75rem] rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              onClick={() => alert('Cancelled (demo only)')}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

/**
 * Content Completion Gate Example (Scroll-Gated)
 * Perfect for educational content or required reading
 */
export const ContentGateExample: React.FC = () => {
  const [canProceed, setCanProceed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Educational Content Gate</h1>
      <p className="mb-6 text-muted-foreground">
        Complete the reading (scroll to 100%) to unlock the next lesson
      </p>

      <div className="border rounded-lg p-6 h-96 overflow-y-auto mb-6 bg-card">
        <article className="prose dark:prose-invert max-w-none">
          <h2>Chapter 1: Introduction to Web Accessibility</h2>
          <p>
            Web accessibility ensures that websites, tools, and technologies are
            designed and developed so that people with disabilities can use
            them. More specifically, people can perceive, understand, navigate,
            and interact with the Web.
          </p>

          <h3>Why Accessibility Matters</h3>
          <p>
            Accessibility addresses discriminatory aspects related to equivalent
            user experience for people with disabilities. Web accessibility also
            benefits people without disabilities, for example:
          </p>
          <ul>
            <li>People using mobile phones, smart watches, smart TVs</li>
            <li>Older people with changing abilities due to aging</li>
            <li>People with temporary disabilities</li>
            <li>People with situational limitations</li>
          </ul>

          <h3>The Four Principles: POUR</h3>
          <p>
            Web accessibility is guided by four main principles. Content must
            be:
          </p>
          <ol>
            <li>
              <strong>Perceivable</strong> - Information must be presentable to
              users in ways they can perceive
            </li>
            <li>
              <strong>Operable</strong> - User interface components must be
              operable
            </li>
            <li>
              <strong>Understandable</strong> - Information and operation of
              user interface must be understandable
            </li>
            <li>
              <strong>Robust</strong> - Content must be robust enough to work
              with current and future technologies
            </li>
          </ol>

          <h3>Getting Started with ARIA</h3>
          <p>
            ARIA (Accessible Rich Internet Applications) provides a way to make
            web content and applications more accessible. ARIA attributes can be
            added to HTML elements to define roles, states, and properties.
          </p>

          <h3>Testing for Accessibility</h3>
          <p>
            Regular testing with screen readers, keyboard navigation, and
            automated tools helps ensure your web applications remain accessible
            to all users.
          </p>
        </article>
      </div>

      <ScrollProgressButton
        mode="scroll-gated"
        variant="button"
        completionThreshold={100}
        type="button"
        onScrollComplete={() => setCanProceed(true)}
        onClick={() => {
          if (canProceed) {
            alert('Proceeding to next lesson!');
          }
        }}
        ariaLabel={
          canProceed
            ? 'Continue to next lesson'
            : 'Read all content to continue'
        }
      >
        {canProceed ? 'Next Lesson →' : ''}
      </ScrollProgressButton>
    </div>
  );
};

/**
 * Custom Completion Threshold Example (Scroll-Gated)
 * Button enables at 80% instead of default 95%
 */
export const CustomThresholdGatedExample: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Custom Threshold (80%)</h1>
      <p className="mb-4 text-muted-foreground">
        Button enables after scrolling 80% of content
      </p>

      <div className="border rounded-lg p-6 h-80 overflow-y-auto mb-4 bg-card">
        <div className="space-y-4">
          {Array.from({ length: 15 }, (_, i) => (
            <p key={i}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          ))}
        </div>
      </div>

      <ScrollProgressButton
        mode="scroll-gated"
        variant="bar"
        completionThreshold={80}
        type="button"
        onScrollComplete={() => setIsComplete(true)}
        onClick={() => alert('Button clicked!')}
        className="w-full h-10 rounded"
      >
        {isComplete ? 'Continue ✓' : 'Scroll to 80%'}
      </ScrollProgressButton>
    </div>
  );
};

/**
 * Bar Variant with Icon and Custom Text Example (Scroll-Gated)
 * Demonstrates bar variant with icon + custom button text
 */
export const BarVariantWithIconExample: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bar Variant with Icon</h1>
      <p className="mb-4 text-muted-foreground">
        Bar variant supports icon + text, defaulting to "Accept"
      </p>

      <div className="border rounded-lg p-6 h-80 overflow-y-auto mb-4 bg-card">
        <div className="space-y-4">
          {Array.from({ length: 15 }, (_, i) => (
            <p key={i}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Default "Accept" text */}
        <ScrollProgressButton
          mode="scroll-gated"
          variant="bar"
          completionThreshold={80}
          type="button"
          buttonColor="primary"
          onScrollComplete={() => setIsComplete(true)}
          onClick={() => alert('Default text clicked!')}
          className="w-full rounded"
        />

        {/* Custom text with icon */}
        <ScrollProgressButton
          mode="scroll-gated"
          variant="bar"
          buttonText={isComplete ? 'Continue Reading' : 'Scroll to Continue'}
          icon={isComplete ? <CheckIcon /> : undefined}
          completionThreshold={80}
          type="button"
          buttonColor="dark"
          fillColor="bg-gray-700"
          onScrollComplete={() => setIsComplete(true)}
          onClick={() => alert('Custom text + icon clicked!')}
          className="w-full rounded"
        />
      </div>
    </div>
  );
};

/**
 * LEGACY: Traditional Scroll-to-Top Button
 * Classic behavior: appears after threshold, scrolls to top on click
 */
export const ScrollToTopExample: React.FC = () => {
  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">Legacy: Scroll-to-Top Button</h1>
      <p className="mb-8 text-muted-foreground">
        Traditional scroll-to-top button appears after scrolling 300px
      </p>

      <div className="space-y-4">
        {Array.from({ length: 25 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        ))}
      </div>

      <ScrollProgressButton
        mode="scroll-to-top"
        variant="button"
        threshold={300}
      />
    </div>
  );
};

/**
 * Legacy: Bar Variant Scroll-to-Top
 */
export const BarScrollToTopExample: React.FC = () => {
  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4 mt-8">
        Legacy: Bar Variant Scroll-to-Top
      </h1>
      <p className="mb-8 text-muted-foreground">
        Progress bar at top shows scroll progress, click to return to top
      </p>

      <div className="space-y-4">
        {Array.from({ length: 25 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>

      <ScrollProgressButton
        mode="scroll-to-top"
        variant="bar"
        threshold={300}
      />
    </div>
  );
};

/**
 * Legacy: Custom Container Scroll Tracking
 */
export const CustomContainerExample: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Legacy: Custom Container Scroll
      </h1>
      <p className="mb-8 text-muted-foreground">
        Button tracks scroll within container, not the whole page
      </p>

      <div
        ref={containerRef}
        className="h-96 overflow-auto border-2 border-border rounded-lg p-4 relative bg-card"
      >
        <h2 className="text-xl font-bold mb-4">Scrollable Container</h2>

        <div className="space-y-4">
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>

        <ScrollProgressButton
          mode="scroll-to-top"
          container={containerRef.current}
          threshold={100}
        />
      </div>
    </div>
  );
};

/**
 * Legacy: Custom onClick Handler
 */
export const CustomOnClickExample: React.FC = () => {
  const [clicks, setClicks] = useState(0);

  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">
        Legacy: Custom onClick Handler
      </h1>
      <p className="mb-4 text-muted-foreground">
        Button with custom click handler (tracks clicks: {clicks})
      </p>

      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        ))}
      </div>

      <ScrollProgressButton
        mode="scroll-to-top"
        onClick={() => {
          setClicks((prev) => prev + 1);
          console.log('Button clicked!');
        }}
      />
    </div>
  );
};
