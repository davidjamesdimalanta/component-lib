# Component Design Library (Name pending)

Production-ready React components built with zero dependencies, optimized for accessibility and developer experience.

## Tech Stack
- React 18.2+ (functional components with hooks only)
- TypeScript 5.0+ (strict mode enabled, no 'any' types)
- Tailwind CSS 3.4+ (utility-first styling, responsive mobile-first)
- Vitest + React Testing Library (behavior-focused testing)
- Zero external dependencies (use native APIs only)

## Development Commands
- `npm run dev` - Storybook development server (port 6006)
- `npm run build` - Build library for distribution
- `npm test` - Run Vitest test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run type-check` - TypeScript validation
- `npm run lint` - ESLint code quality checks

## Component Architecture Principles

### Code Structure
- Maximum 150 lines per component (split if longer)
- Extract logic to custom hooks (use- prefix)
- Use composition patterns (children prop, compound components)
- Co-locate tests: Component.tsx + Component.test.tsx

### React Patterns
- Functional components only (no classes)
- useState with functional updates: `setState(prev => prev + 1)`
- useEffect with proper cleanup: AbortController for async
- useCallback for event handlers to memoized children
- useMemo only for expensive computations (>5ms measured)
- React.memo only after profiling shows performance issues

### TypeScript Standards
- Use type aliases for props (better unions): `type Props = {...}`
- Discriminated unions for variants: `{variant: 'modal'; onClose: () => void} | {variant: 'inline'}`
- Extend HTML elements: `React.ComponentPropsWithoutRef<'button'>`
- Explicit event types: `React.MouseEvent<HTMLButtonElement>`
- Generic components: `function List<T>(props: ListProps<T>)`
- Export types with components: `export type { ButtonProps }`

### Prop Naming Conventions
- Booleans: `isOpen`, `hasError`, `shouldValidate`
- Callbacks: `onClick`, `onChange`, `onClose`, `onSubmit`
- Content: `label`, `description`, `title`, `placeholder`
- Variants: `variant`, `size`, `color` (consistent across library)

### Zero-Dependency Implementations
Use native APIs instead of libraries:
- Array methods instead of lodash
- Intl API + Date instead of date-fns
- `crypto.randomUUID()` instead of uuid package
- Template literals + filter: `cn(...classes) => classes.filter(Boolean).join(' ')`

## Accessibility Requirements (WCAG 2.2 AA)

### Semantic HTML First
- Use `<button>` not `<div onClick>`
- Use `<nav>`, `<main>`, `<article>` for landmarks
- Use proper heading hierarchy (h1 -> h2 -> h3)
- Use native form elements with labels

### ARIA Only When Needed
- Icon-only buttons: `aria-label="Close dialog"`
- Live regions: `aria-live="polite"` for dynamic content
- Custom controls: Full ARIA pattern implementation
- Never: Redundant roles on semantic HTML

### Keyboard Navigation
- All interactions accessible via keyboard
- Visible focus indicators (Tailwind: `focus:ring-2 focus:ring-blue-500`)
- Logical tab order (use tabIndex only when necessary)
- Escape closes dialogs/dropdowns
- Enter/Space activate buttons
- Arrow keys navigate lists/menus

### Focus Management
- Trap focus in modals: cycle Tab through modal content
- Return focus after closing: store activeElement, restore on unmount
- Focus first element when opening: `useEffect(() => firstElement.focus())`

## Testing Strategy

### Write Tests Using React Testing Library
- Test user behavior, not implementation
- Use `getByRole` queries (accessibility-first)
- Avoid `getByTestId` except as last resort
- Test keyboard interactions (Tab, Enter, Escape, Arrow keys)
- Validate ARIA attributes present

### Coverage Requirements
- Happy path: Normal usage with valid props
- Edge cases: Empty arrays, null values, long content
- Error states: Invalid props, failed operations
- Loading states: Async data fetching
- Interactions: Click, keyboard, focus
- Accessibility: Screen reader compatibility

### Example Test Structure
```typescript
describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<Component {...requiredProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const onAction = vi.fn();
    render(<Component onAction={onAction} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('supports keyboard navigation', async () => {
    render(<Component />);
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });
});
```

## Tailwind CSS Guidelines
- Use utility classes directly (no custom CSS)
- Responsive: Mobile-first with sm:, md:, lg: prefixes
- State variants: hover:, focus:, active:, disabled:
- Dark mode: `dark:bg-gray-800` (if supporting themes)
- Maintain color contrast: WCAG AA requires 4.5:1 for text

## Error Handling

### Prop Validation
Validate props at component entry:
```typescript
if (!Array.isArray(items)) {
  console.error('[ComponentName] items must be an array');
  return <ErrorState message="Invalid props" />;
}
if (items.length === 0) return <EmptyState />;
```

### Handle Edge Cases
- Zero: Empty arrays, null, undefined
- One: Single item (often causes layout issues)
- Many: 10-50 items (normal usage)
- Max: Boundary values (pagination limits)
- Invalid: Wrong types, malformed data

### Graceful Degradation
If feature fails, core functionality continues:
- Image fails → show placeholder
- Network fails → show cached data or error state
- Analytics fails → continue without tracking

## Documentation Requirements

### JSDoc Comments on All Exports
```typescript
/**
 * @description Button component with consistent styling and behavior
 * @param variant - Visual style: 'primary' | 'secondary' | 'danger'
 * @param size - Component size: 'sm' | 'md' | 'lg'
 * @param disabled - Prevents interaction when true
 * @param onClick - Callback fired on click
 * @param children - Button content (text or elements)
 * @returns Accessible button element
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Save Changes
 * </Button>
 */
```

### Component README
Each component needs:
- Overview: What it does, when to use it
- Installation: Import statement
- Basic example: <10 lines working code
- Variant examples: 3-5 common uses
- Props reference: Table with types and descriptions
- Accessibility notes: ARIA, keyboard support

## Git Workflow

### Branch Naming
`feature/ISSUE-123-scroll-progress` or `fix/button-focus-state`

### Commit Format
Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`
Example: `feat(Button): add loading state with spinner`

### Pre-commit Checklist
- [ ] All tests pass: `npm test`
- [ ] Types valid: `npm run type-check`
- [ ] Linter clean: `npm run lint`
- [ ] Accessibility verified: Manual keyboard navigation test

### Do NOT
- Commit directly to main branch
- Skip tests or type checking
- Modify generated files in dist/
- Use 'any' type (use 'unknown' if truly unknown)
- Add external dependencies without discussion

## Constitutional Principles for Code Generation

When generating code, evaluate against these principles:

**Accuracy Principle**: Only reference React 18+ APIs, TypeScript 5+ features, and native Web APIs. If uncertain about API existence, state uncertainty rather than guess.

**Accessibility Principle**: All components must meet WCAG 2.2 AA standards. Interactive elements must be keyboard accessible with visible focus.

**Quality Principle**: Generate maintainable code with clear naming, single responsibility, and composition over complexity. If a component exceeds 150 lines, decompose it.

**Security Principle**: Validate all external inputs. Never use dangerouslySetInnerHTML without sanitization. Escape user content.

**Testing Principle**: Every component requires tests covering normal use, edge cases, and accessibility. Tests should validate behavior, not implementation.

## Prompting Guidelines for AI Assistance

When requesting component generation:

1. **Specify Role**: "Act as a senior React engineer specializing in accessible component design"
2. **Provide Context**: Reference existing components as patterns
3. **Define Task**: Specific requirements, expected behavior, props API
4. **Set Constraints**: Zero dependencies, accessibility standards, TypeScript strict
5. **Request Output**: Component file, type definitions, tests, usage examples, README

Example request:

```
Create an accessible ScrollProgressButton component following our library patterns:
Role: Senior React + TypeScript developer, accessibility expert
Requirements:

Shows scroll progress as button background fill
Smoothly scrolls to top on click
Accessible with keyboard (focus visible, Space/Enter activates)
Zero dependencies (use native scroll APIs)
TypeScript strict types
Tailwind for styling (fixed position, responsive)
Vitest tests with RTL

Deliverables:

ScrollProgressButton.tsx with full TypeScript
ScrollProgressButton.types.ts
ScrollProgressButton.test.tsx
Usage examples (3 variants)
README with props documentation

Match our Button component's prop naming (variant, size, className).
```


## Additional Resources
- React documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- WCAG Guidelines: https://www.w3.org/WAI/WCAG22/quickref/
- React Testing Library: https://testing-library.com/react