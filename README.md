# Scroll Progress Button

A lightweight, accessible React button component that displays scroll progress and scrolls to top. Built with Tailwind CSS and zero dependencies.

## Features

- 🪶 **Zero Dependencies** - Only React and Tailwind CSS
- ♿️ **Fully Accessible** - WCAG 2.2 AA compliant with ARIA support
- 🎨 **Customizable** - Two variants: circular button & progress bar
- ⚡️ **Performant** - Uses native browser APIs and GPU acceleration
- 🌗 **Dark Mode Ready** - Built-in dark mode support
- 📦 **TypeScript** - Full type safety
- 🎯 **Motion Aware** - Respects prefers-reduced-motion

## Installation

### Copy Component Files

This component follows the shadcn/ui distribution model. Copy the component directory directly into your project:

```bash
# Copy the entire component directory
cp -r src/components/ScrollProgressButton your-project/src/components/
```

### Install Dependencies

Make sure you have the required peer dependencies:

```bash
npm install react react-dom
npm install -D tailwindcss
```

### Optional: Install clsx

For cleaner conditional classes:

```bash
npm install clsx
```

## Quick Start

```tsx
import { ScrollProgressButton } from '@/components/ScrollProgressButton';

export default function App() {
  return (
    <div>
      {/* Your content */}
      <ScrollProgressButton />
    </div>
  );
}
```

## Documentation

For comprehensive documentation, API reference, and examples, see the [component README](src/components/ScrollProgressButton/README.md).

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

MIT © [Your Name]

---

**Built with ❤️ using React and Tailwind CSS**
