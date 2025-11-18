# Testing

Learn how to test Worlder with Cypress.

## Test Setup

Worlder uses Cypress for end-to-end and component testing.

### Install Dependencies

```bash
npm install -D cypress @cypress/vite-dev-server
```

### Run Tests

```bash
# Run all tests
npm test

# Open Cypress UI
npm run test:open

# Run E2E tests
npm run test:e2e

# Run component tests
npm run test:component
```

## Test Structure

### E2E Tests

Located in `cypress/e2e/`:

- `login.cy.ts` - Login page tests
- `register.cy.ts` - Registration tests
- `search.cy.ts` - Search functionality
- `theme-language.cy.ts` - Theme and language toggle tests

### Component Tests

Located alongside components with `.cy.tsx` extension.

## Writing Tests

### Login Test Example

```typescript
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.contains('Login').should('be.visible');
    cy.get('input[type=\"email\"]').should('be.visible');
    cy.get('input[type=\"password\"]').should('be.visible');
  });

  it('should show validation errors', () => {
    cy.get('button[type=\"submit\"]').click();
    cy.contains('Email is required').should('be.visible');
  });
});
```

### Search Test Example

```typescript
describe('Search', () => {
  it('should search for movies', () => {
    cy.visit('/search');
    cy.get('input[type=\"text\"]').type('Avengers');
    cy.get('button[type=\"submit\"]').click();
    cy.get('[class*=\"MovieCard\"]').should('have.length.greaterThan', 0);
  });
});
```

## Best Practices

### 1. Use Data Attributes

```tsx
<button data-cy=\"login-button\">Login</button>
```

```typescript
cy.get('[data-cy=\"login-button\"]').click();
```

### 2. Avoid Hard-coded Waits

```typescript
// Bad
cy.wait(2000);

// Good
cy.intercept('GET', '/api/movies').as('getMovies');
cy.wait('@getMovies');
```

### 3. Clean Up State

```typescript
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});
```

### 4. Mock API Calls

```typescript
cy.intercept('POST', '**/auth/**', {
  statusCode: 200,
  body: { user: { id: 1, email: 'test@example.com' } },
}).as('login');
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
```

## Coverage

To generate coverage reports:

```bash
npm run test:coverage
```

## Debugging

### Visual Debugging

Use Cypress UI for visual debugging:
```bash
npm run test:open
```

### Screenshots

Cypress automatically takes screenshots on failure.

### Videos

Enable video recording in `cypress.config.ts`:

```typescript
export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,
});
```
