# ScrollProgressButton

An accessible React component that displays scroll progress and scrolls to the top of the page or container when clicked. Built with zero dependencies (only React and Tailwind CSS).

## Features

- 🪶 **Zero Dependencies** - Only React and Tailwind CSS required
- ♿️ **Fully Accessible** - WCAG 2.2 AA compliant with complete ARIA support
- 🎨 **Two Variants** - Circular button or horizontal progress bar
- ⚡️ **High Performance** - GPU-accelerated animations with requestAnimationFrame
- 🎯 **Motion Aware** - Respects prefers-reduced-motion user preference
- 🌗 **Dark Mode Ready** - Built-in dark mode support via CSS variables
- 📦 **TypeScript** - Full type safety with strict mode
- 🔧 **Configurable** - Track page or container scroll, customizable threshold
- 📱 **Responsive** - Works on all screen sizes and devices

## Installation

### Copy Component Files

This component follows the shadcn/ui distribution model. Copy the entire component directory into your project:

```bash
cp -r src/components/ScrollProgressButton your-project/src/components/
```

### Dependencies

Ensure you have the required peer dependencies:

```bash
npm install react react-dom
npm install -D tailwindcss
```

### Optional: clsx

For cleaner conditional class names:

```bash
npm install clsx
```

## Usage

### Basic Usage (Circular Variant)

```tsx
import { ScrollProgressButton } from '@/components/ScrollProgressButton';

export default function App() {
  return (
    <div>
      {/* Your scrollable content */}
      <ScrollProgressButton />
    </div>
  );
}
```

### Bar Variant

```tsx
<ScrollProgressButton variant="bar" />
```

### Custom Threshold

```tsx
// Button appears after scrolling 500px
<ScrollProgressButton threshold={500} />
```

### Custom Container (Section Scroll)

```tsx
import { useRef } from 'react';

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{ height: '500px', overflow: 'auto' }}
    >
      {/* Scrollable content */}
      <ScrollProgressButton container={containerRef.current} />
    </div>
  );
}
```

### Custom Styling

```tsx
<ScrollProgressButton
  className="!bg-blue-600 hover:!bg-blue-700 !w-16 !h-16"
/>
```

### Custom Click Handler

```tsx
<ScrollProgressButton
  onClick={() => {
    console.log('Scrolling to top!');
    // Your custom logic here
  }}
/>
```

### Custom Icon (Circular Variant Only)

```tsx
<ScrollProgressButton>
  <YourCustomIcon />
</ScrollProgressButton>
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'circular' \| 'bar'` | `'circular'` | Visual style variant |
| `className` | `string` | `undefined` | Custom CSS classes (use `!` prefix to override defaults) |
| `threshold` | `number` | `300` | Scroll distance in pixels before button appears |
| `container` | `HTMLElement \| null` | `null` | Custom scroll container (defaults to window) |
| `onClick` | `() => void` | `undefined` | Custom click handler (called before scrolling) |
| `children` | `React.ReactNode` | up arrow icon | Button content (circular variant only) |
| `ariaLabel` | `string` | `'Scroll to top of page'` | Accessible label for screen readers |

## Variants

### Circular Variant

- Round button in the bottom-right corner
- Progress shown as background fill that grows with scroll
- Includes up arrow icon (customizable)
- Fixed positioning: `bottom-6 right-6`
- Size: 56x56px (14 Tailwind units)
- Perfect for minimal, unobtrusive designs

### Bar Variant

- Horizontal progress bar at the top of viewport
- Bar fills from left to right as user scrolls
- Height: 4px (expands to 8px on hover)
- Full viewport width
- Ideal for reading experiences and article pages

## Accessibility

This component is built with accessibility as a core principle:

### ARIA Support

- **role="progressbar"** - Identifies the progress indicator
- **aria-valuenow** - Current progress percentage (0-100)
- **aria-valuemin="0"** - Minimum progress value
- **aria-valuemax="100"** - Maximum progress value
- **aria-label** - Descriptive label for the button

### Keyboard Navigation

- **Tab** - Focus the button when visible
- **Enter** - Activate button and scroll to top
- **Space** - Activate button and scroll to top
- Visible focus indicators (ring on focus)
- Proper tab order (not focusable when hidden)

### Screen Readers

- Meaningful labels describe button purpose
- Progress announcements at key milestones
- Screen reader-only content for context
- No overwhelming or constant updates

### Motion Preferences

- Detects `prefers-reduced-motion` CSS media query
- Disables animations when user prefers reduced motion
- Uses instant scroll instead of smooth scroll
- Applies `motion-reduce:` Tailwind utilities

## Performance

The component is highly optimized:

- **requestAnimationFrame** - Throttles scroll updates to 60fps
- **GPU Acceleration** - Uses CSS transforms (scaleX) not width
- **Passive Event Listeners** - Improves scrolling performance
- **Efficient Re-renders** - Minimizes unnecessary updates
- **Zero Layout Thrashing** - Batch DOM reads and writes

## Browser Support

Supports all modern browsers:

- Chrome/Edge 90+ (April 2021)
- Firefox 88+ (April 2021)
- Safari 14+ (September 2020)
- iOS Safari 14+
- Samsung Internet 14+

All native APIs used (scroll events, requestAnimationFrame, matchMedia, CSS transforms) have universal support since 2019-2020.

## Custom Hooks

The component exports two custom hooks you can use independently:

### useScrollProgress

Tracks scroll position as percentage (0-100%):

```tsx
import { useScrollProgress } from '@/components/ScrollProgressButton';

function MyComponent() {
  const progress = useScrollProgress();

  return <div>Page is {progress}% scrolled</div>;
}
```

### useReducedMotion

Detects user motion preferences:

```tsx
import { useReducedMotion } from '@/components/ScrollProgressButton';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior })}>
      Scroll to top
    </button>
  );
}
```

## Examples

See the [examples directory](../../examples/BasicExample.tsx) for complete working examples:

- Basic usage (default settings)
- Custom threshold
- Bar variant
- Custom styling
- Custom container (section scroll)
- Custom onClick handler
- All variants comparison

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  ScrollProgressButtonProps,
  ScrollProgressButtonVariant,
} from '@/components/ScrollProgressButton';
```

## Contributing

Found a bug or want to add a feature? See our [Contributing Guidelines](../../../CONTRIBUTING.md).

## License

MIT © [David James Dimalanta](../../../LICENSE)
