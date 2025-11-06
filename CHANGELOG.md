# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-10-30

### ⚠️ BREAKING CHANGES

**Default Mode Changed**: The `ScrollProgressButton` component now defaults to `scroll-gated` mode instead of `scroll-to-top` behavior. This is a breaking change for existing users.

**Migration Required**: If you were using the component in its default state for scroll-to-top functionality, you must now explicitly set `mode="scroll-to-top"`:

```tsx
// Before (v0.1.0)
<ScrollProgressButton />

// After (v0.2.0) - for same behavior
<ScrollProgressButton mode="scroll-to-top" />
```

### Added

#### Primary Feature: Scroll-Gated Mode
- **NEW: Scroll-gated form submission mode** - Button disabled until user scrolls through content
- Perfect for Terms of Service acceptance, content gates, and required reading
- New `mode` prop: `'scroll-gated'` (default) or `'scroll-to-top'` (legacy)
- New `completionThreshold` prop: Percentage (0-100) required to enable button (default: 95%)
- New `type` prop: Button HTML type attribute (`'submit'` or `'button'`)
- New `disabled` prop: Manual disabled override
- New `onScrollComplete` callback: Fires once when scroll threshold is reached
- Disabled state styling: Opacity-50, cursor-not-allowed
- Full ARIA support for disabled states: `aria-disabled="true"`
- Mode-specific default ARIA labels

#### Enhanced Features
- Form integration support with `type="submit"` (default in scroll-gated mode)
- Children content support for button text/icons
- Improved accessibility with disabled state announcements
- Comprehensive test suite for scroll-gated functionality
- New usage examples: Terms of Service form, content gate, custom thresholds

### Changed
- **BREAKING**: Default mode changed from scroll-to-top to scroll-gated
- **BREAKING**: Default `type` attribute is now context-aware:
  - `scroll-gated` mode: defaults to `type="submit"`
  - `scroll-to-top` mode: defaults to `type="button"`
- Updated all existing tests to explicitly use `mode="scroll-to-top"` for backward compatibility
- Reorganized examples to show scroll-gated use cases first
- Updated demo app with mode switcher UI
- Enhanced component documentation with migration guide

### Fixed
- Improved visibility logic: scroll-gated buttons always visible (users need to see disabled state)
- Better keyboard navigation with disabled state handling
- Proper event handler blocking when button is disabled

### Documentation
- Added comprehensive migration guide (v0.1.0 → v0.2.0)
- Updated README with scroll-gated primary use case
- New examples: Terms of Service acceptance, educational content gates
- Updated API documentation with all new props
- Added breaking changes section to CHANGELOG

### Developer Experience
- New test file: `ScrollProgressButton.scrollGated.test.tsx` (240+ lines of tests)
- Updated `BasicExample.tsx` with 8 different usage patterns
- Enhanced type definitions with JSDoc comments
- Better TypeScript intellisense for mode-specific behavior

## [0.1.0] - 2025-10-29

### Added
- Initial project structure
- TypeScript configuration with strict mode
- Testing setup with Vitest and React Testing Library
- Tailwind CSS configuration with CSS variables
- ESLint and Prettier configuration
- GitHub templates and CI workflow
- ScrollProgressButton component with circular and bar variants
- Custom hooks: useScrollProgress, useReducedMotion
- Full accessibility support (WCAG 2.2 AA compliant)
- Comprehensive documentation and examples

[Unreleased]: https://github.com/davidjamesdimalanta/dd-component-lib/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/davidjamesdimalanta/dd-component-lib/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/davidjamesdimalanta/dd-component-lib/releases/tag/v0.1.0
