# ScrollProgressButton

A Scroll-Gated Button with two modes:
1. **Scroll-gated mode** (primary): Button disabled until user scrolls through content - perfect for Terms of Service, content gates, and ensuring users read material
2. **Scroll-to-top mode** (legacy): Traditional scroll-to-top button with progress indicator

Built with React and Tailwind CSS.

## Features

- **Zero Dependencies** - Only React and Tailwind CSS required
- **Fully Accessible** - WCAG 2.2 AA compliant with complete ARIA support
- **Two Modes** - Scroll-gated (primary) or scroll-to-top (legacy)
- **Three Variants** - Button (circular/rectangular) or horizontal bar
- **High Performance** - GPU-accelerated animations with requestAnimationFrame
- **Motion Aware** - Respects prefers-reduced-motion user preference
- **Dark Mode Ready** - Built-in dark mode support via CSS variables
- **TypeScript** - Full type safety with strict mode
- **Configurable** - Track page or container scroll, customizable thresholds
- **Responsive** - Works on all screen sizes and devices

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

## Usage

### Scroll-Gated Mode (Primary Use Case)

Perfect for Terms of Service, content gates, or ensuring users read through content before proceeding.

#### Basic Scroll-Gated Button

```tsx
import { ScrollProgressButton } from '@/components/ScrollProgressButton';

export default function TermsOfService() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div>
      <div
        ref={setContainer}
        className="h-96 overflow-y-auto border rounded-lg p-6"
      >
        {/* Your Terms of Service content */}
        <h2>Terms of Service</h2>
        <p>Please read through all terms...</p>
      </div>

      <ScrollProgressButton
        mode="scroll-gated"
        variant="button"
        buttonText="Accept Terms"
        container={container}
        completionThreshold={95}
        onScrollComplete={() => console.log('User finished reading!')}
      />
    </div>
  );
}
```

#### Bar Variant for Scroll-Gated

```tsx
<div className="relative">
  <div ref={setContainer} className="h-96 overflow-y-auto">
    {/* Scrollable content */}
  </div>

  <ScrollProgressButton
    mode="scroll-gated"
    variant="bar"
    buttonText="Accept"
    container={container}
    completionThreshold={100}
  />
</div>
```

#### Comprehensive Scroll-Gated Example

```tsx
<ScrollProgressButton
  // Mode and variant
  mode="scroll-gated"
  variant="button" // or "bar"
  shape="rectangular" // only for button variant: "circular" | "rectangular"

  // Content
  buttonText="Submit"
  icon={<CheckIcon />}
  children={<CustomContent />} // overrides buttonText and icon

  // Colors (all accept ColorPreset or Tailwind classes)
  buttonColor="bg-black" // enabled state background
  disabledColor="bg-stone-700" // disabled state background
  fillColor="bg-gray-700" // progress fill color

  // Behavior
  completionThreshold={95} // percentage (0-100) to enable button
  container={containerElement} // track scroll in specific element
  type="submit" // button type: "submit" | "button"
  disabled={false} // manual disable override
  onClick={() => handleSubmit()} // custom click handler
  onScrollComplete={() => setAgreed(true)} // fires when threshold reached

  // Styling
  className="custom-class"
  ariaLabel="Accept terms to continue"
/>
```

### Scroll-to-Top Mode (Legacy)

Traditional scroll-to-top button that appears after scrolling past a threshold.

#### Basic Scroll-to-Top

```tsx
<ScrollProgressButton
  mode="scroll-to-top"
  variant="button"
  threshold={300}
/>
```

#### Bar Variant for Scroll-to-Top

```tsx
<ScrollProgressButton
  mode="scroll-to-top"
  variant="bar"
  threshold={300}
/>
```

## Props API

### Complete Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **Mode & Variant** |
| `mode` | `'scroll-gated' \| 'scroll-to-top'` | `'scroll-gated'` | Component behavior mode |
| `variant` | `'button' \| 'bar'` | `'button'` | Visual style variant |
| `shape` | `'circular' \| 'rectangular'` | `'rectangular'` (scroll-gated)<br/>`'circular'` (scroll-to-top) | Button shape (button variant only) |
| **Content** |
| `buttonText` | `string` | `'Submit'` (button)<br/>`'Accept'` (bar) | Text displayed in button |
| `icon` | `React.ReactNode` | `undefined` | Icon to display alongside text |
| `children` | `React.ReactNode` | `undefined` | Custom button content (overrides buttonText & icon) |
| **Colors** |
| `buttonColor` | `ColorPreset \| string` | `'bg-black'` | Button background when enabled |
| `disabledColor` | `string` | `'bg-stone-700'` | Button background when disabled |
| `fillColor` | `string` | Based on `buttonColor` | Progress fill color |
| **Behavior** |
| `completionThreshold` | `number` | `95` | Scroll percentage to enable button (scroll-gated only) |
| `threshold` | `number` | `300` | Pixels to scroll before showing button (scroll-to-top only) |
| `container` | `HTMLElement \| null` | `null` | Custom scroll container (defaults to window) |
| `type` | `'submit' \| 'button'` | `'submit'` (scroll-gated)<br/>`'button'` (scroll-to-top) | Button HTML type attribute |
| `disabled` | `boolean` | `false` | Manual disable override |
| **Callbacks** |
| `onClick` | `() => void` | `undefined` | Custom click handler |
| `onScrollComplete` | `() => void` | `undefined` | Fires when completionThreshold reached (scroll-gated only) |
| **Styling & A11y** |
| `className` | `string` | `undefined` | Custom CSS classes |
| `ariaLabel` | `string` | Auto-generated | Accessible label for screen readers |

### ColorPreset Type

The `buttonColor` prop accepts either a preset or any Tailwind class:

```tsx
type ColorPreset = 'dark' | 'primary' | 'secondary';

// Usage examples:
buttonColor="dark"           // Uses preset: bg-gray-900
buttonColor="primary"        // Uses theme primary color
buttonColor="bg-blue-600"    // Custom Tailwind class
buttonColor="bg-[#1a1a1a]"   // Arbitrary value
```

### Disabled State Styling

When disabled (scroll-gated mode before threshold reached):
- Background: `bg-stone-700` (customizable via `disabledColor`)
- Text: `text-stone-300` (consistent across all variants)
- No opacity reduction - full 100% opacity with distinct colors
- Cursor: `cursor-not-allowed`

## Variants

### Button Variant (Circular)

- Round button fixed in bottom-right corner
- Progress shown as background fill
- Size: 56x56px (3.5rem)
- Default for scroll-to-top mode
- Includes up arrow icon by default

### Button Variant (Rectangular)

- Rectangular button with rounded corners
- Progress shown as background fill
- Min size: 176x44px (11rem x 2.75rem)
- Default for scroll-gated mode
- Displays custom text and optional icon

### Bar Variant

- Horizontal bar at top of viewport/container
- Progress fills from left to right
- Height: 44px (2.75rem) - meets WCAG touch target
- Full width
- Displays text and optional icon
- **Note:** Bar variant not supported in scroll-to-top mode

## Scroll-Gated Mode Details

### Completion Threshold

The `completionThreshold` determines when the button becomes enabled:

```tsx
// Button enables at 95% scroll (recommended default)
<ScrollProgressButton completionThreshold={95} />

// Require 100% scroll (strict)
<ScrollProgressButton completionThreshold={100} />

// Enable at 80% scroll (lenient)
<ScrollProgressButton completionThreshold={80} />
```

### onScrollComplete Callback

Fires once when the user reaches the completion threshold:

```tsx
const [hasReadTerms, setHasReadTerms] = useState(false);

<ScrollProgressButton
  mode="scroll-gated"
  completionThreshold={95}
  onScrollComplete={() => {
    setHasReadTerms(true);
    console.log('User has read through content');
  }}
/>
```

### Form Integration

The button defaults to `type="submit"` in scroll-gated mode for seamless form integration:

```tsx
<form onSubmit={handleSubmit}>
  <div ref={setContainer} className="overflow-y-auto h-96">
    {/* Terms content */}
  </div>

  <ScrollProgressButton
    mode="scroll-gated"
    variant="button"
    buttonText="Accept & Continue"
    container={container}
    // type="submit" is default - will trigger form submission
  />
</form>
```

## Accessibility

This component is built with accessibility as a core principle:

### ARIA Support

- **role="button"** - Identifies interactive element (button variant)
- **role="progressbar"** - Identifies progress indicator (bar variant)
- **aria-valuenow** - Current progress percentage (0-100)
- **aria-valuemin="0"** - Minimum progress value
- **aria-valuemax="100"** - Maximum progress value
- **aria-label** - Descriptive label for the button
- **aria-disabled** - Indicates disabled state in scroll-gated mode

### Keyboard Navigation

- **Tab** - Focus the button when visible
- **Enter** - Activate button (triggers form submit for type="submit")
- **Space** - Activate button
- Visible focus indicators (ring on focus)
- Proper tab order (not focusable when hidden via opacity-0)
- Disabled buttons are focusable with `tabIndex={0}` but don't respond to activation

### Screen Readers

- Meaningful labels describe button purpose
- Progress announcements include percentage
- Screen reader-only text provides context
- Disabled state announced with "Scroll to enable" prompt

### Motion Preferences

- Detects `prefers-reduced-motion` CSS media query
- Disables animations when user prefers reduced motion
- Uses instant scroll instead of smooth scroll
- Applies `motion-reduce:` Tailwind utilities

### Touch Target Size (WCAG 2.2)

All interactive elements meet WCAG 2.2 AA minimum touch target size:
- Button variant: minimum 44x44px (2.75rem)
- Bar variant: 44px height, full width
- Proper spacing maintained on all screen sizes

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

- Terms of Service (scroll-gated button)
- Content Gate (scroll-gated with custom threshold)
- Bar variant (scroll-gated at bottom of container)
- Bar with icon and custom text
- Custom threshold examples (80%, 95%, 100%)
- Scroll-to-top (legacy circular button)
- Scroll-to-top (legacy bar variant)
- Custom container scroll tracking

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  ScrollProgressButtonProps,
  ScrollProgressButtonMode,
  ScrollProgressButtonVariant,
  ButtonShape,
  ColorPreset,
} from '@/components/ScrollProgressButton';
```

## Contributing

Found a bug or want to add a feature? See our [Contributing Guidelines](../../../CONTRIBUTING.md).

## License

MIT © [David James Dimalanta](../../../LICENSE)
