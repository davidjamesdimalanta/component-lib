# Contributing to Component Library

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Git

### Setup Development Environment

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dd-component-lib.git
   cd dd-component-lib
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

- `feature/` - New features (e.g., `feature/add-circular-variant`)
- `fix/` - Bug fixes (e.g., `fix/scroll-calculation`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `test/` - Test additions/modifications (e.g., `test/add-keyboard-tests`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-hook`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `style:` - Code style changes (formatting, etc.)

**Examples:**
```
feat(button): add bar variant with horizontal progress

fix(accessibility): correct ARIA attribute values

docs(readme): update installation instructions

test(scroll): add tests for custom container
```

## Code Standards

### TypeScript

- Use TypeScript strict mode
- Provide JSDoc comments for all exported APIs
- Export interfaces and types
- Avoid `any` types (use `unknown` instead)
- Maximum 150 lines per component (split if longer)

### React

- Use functional components with hooks
- Follow React best practices
- Ensure components are accessible
- Handle cleanup in useEffect
- Use `useCallback` for event handlers passed to memoized children
- Use `useMemo` only for expensive computations (>5ms measured)

### Styling

- Use Tailwind utility classes
- Follow the CSS variable theming pattern
- Support dark mode
- Respect motion preferences

### Testing

- Write tests for all new features
- Maintain >80% code coverage
- Test accessibility with @testing-library/jest-dom
- Test keyboard navigation
- Test edge cases

### Linting and Formatting

Before committing, ensure:

```bash
# Type checking passes
npm run type-check

# Linting passes
npm run lint

# Formatting is correct
npm run format

# Tests pass
npm test
```

## Pull Request Process

1. **Ensure your code meets all standards**
   - [ ] Tests pass
   - [ ] Type checking passes
   - [ ] Linting passes
   - [ ] Code is formatted

2. **Update documentation**
   - [ ] Update README if needed
   - [ ] Add/update JSDoc comments
   - [ ] Update CHANGELOG.md

3. **Write a clear PR description**
   - Link to related issue
   - Describe changes made
   - Include screenshots for UI changes
   - List testing performed

4. **Request review**
   - Wait for maintainer review
   - Address any feedback
   - Make requested changes

5. **Merge**
   - Maintainer will merge once approved
   - Delete your branch after merge

## Testing Guidelines

### Unit Tests

Test individual component behavior:

```typescript
describe('ScrollProgressButton', () => {
  it('renders with required props', () => {
    render(<ScrollProgressButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calculates scroll progress correctly', () => {
    // Test implementation
  });
});
```

### Accessibility Tests

Test ARIA attributes and keyboard navigation:

```typescript
it('has proper ARIA attributes', () => {
  render(<ScrollProgressButton />);
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label');
});

it('responds to Enter key', async () => {
  render(<ScrollProgressButton />);
  const button = screen.getByRole('button');
  await userEvent.keyboard('{Enter}');
  // Assert expected behavior
});
```

### Manual Testing

- Test in Chrome, Firefox, and Safari
- Test with keyboard only (no mouse)
- Test with screen reader (NVDA, JAWS, or VoiceOver)
- Test with reduced motion enabled
- Test on mobile devices

## Reporting Issues

### Bug Reports

When reporting bugs, include:

- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, browser, React version)
- Screenshots if applicable

### Feature Requests

When requesting features:

- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider alternative approaches
- Discuss potential impact

## Questions?

- Open an issue with the `question` label
- Check existing issues for similar questions
- Be respectful and patient

## Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for their contributions
- GitHub contributors page

Thank you for contributing!
