import React, { useRef } from 'react';
import { ScrollProgressButton } from '../components/ScrollProgressButton';

/**
 * Basic example showing default usage
 */
export const BasicExample: React.FC = () => {
  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">Basic Example</h1>
      <p className="mb-8">Scroll down to see the button appear</p>

      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>

      <ScrollProgressButton />
    </div>
  );
};

/**
 * Example with custom threshold
 */
export const CustomThresholdExample: React.FC = () => {
  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">Custom Threshold Example</h1>
      <p className="mb-8">Button appears after scrolling 500px</p>

      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        ))}
      </div>

      <ScrollProgressButton threshold={500} />
    </div>
  );
};

/**
 * Example with bar variant
 */
export const BarVariantExample: React.FC = () => {
  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4 mt-8">Bar Variant Example</h1>
      <p className="mb-8">Progress bar appears at the top of the page</p>

      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        ))}
      </div>

      <ScrollProgressButton variant="bar" />
    </div>
  );
};

/**
 * Example with custom styling
 */
export const CustomStyledExample: React.FC = () => {
  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">Custom Styled Example</h1>
      <p className="mb-8">Button with custom colors and size</p>

      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-lg">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        ))}
      </div>

      <ScrollProgressButton className="!w-16 !h-16 !bg-blue-600 hover:!bg-blue-700" />
    </div>
  );
};

/**
 * Example with custom container (section scroll tracking)
 */
export const CustomContainerExample: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Custom Container Example</h1>
      <p className="mb-8">
        Button tracks scroll within the container (not the whole page)
      </p>

      <div
        ref={containerRef}
        className="h-96 overflow-auto border-2 border-border rounded-lg p-4 relative"
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
          container={containerRef.current}
          threshold={100}
        />
      </div>
    </div>
  );
};

/**
 * Example with custom onClick handler
 */
export const CustomOnClickExample: React.FC = () => {
  const [clicks, setClicks] = React.useState(0);

  return (
    <div className="min-h-[200vh] p-8">
      <h1 className="text-3xl font-bold mb-4">Custom onClick Example</h1>
      <p className="mb-4">
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
        onClick={() => {
          setClicks((prev) => prev + 1);
          console.log('Button clicked!');
        }}
      />
    </div>
  );
};

/**
 * Example with both variants side by side
 */
export const AllVariantsExample: React.FC = () => {
  const [variant, setVariant] = React.useState<'circular' | 'bar'>('circular');

  return (
    <div className="min-h-[200vh] p-8">
      <div className="fixed top-4 left-4 z-50 bg-background border border-border rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-bold mb-2">Choose Variant:</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setVariant('circular')}
            className={`px-4 py-2 rounded-md ${
              variant === 'circular'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary'
            }`}
          >
            Circular
          </button>
          <button
            onClick={() => setVariant('bar')}
            className={`px-4 py-2 rounded-md ${
              variant === 'bar'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="pt-24">
        <h1 className="text-3xl font-bold mb-4">All Variants Example</h1>
        <p className="mb-8">Switch between circular and bar variants</p>

        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="text-lg">
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>

      <ScrollProgressButton variant={variant} />
    </div>
  );
};
