# Project Structure

This document explains the organization and architecture of the Worlder application.

## Overview

The project follows a modular architecture with clear separation of concerns:

```
worlder/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── stores/          # Zustand state management
│   ├── services/        # External API integrations
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── locales/         # i18n translation files
│   ├── routes/          # Route configuration
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root application component
│   ├── main.tsx         # Application entry point
│   └── i18n.ts          # i18n configuration
├── cypress/             # End-to-end tests
├── docs/                # Documentation (Docsify)
└── public/              # Static assets
```

## Core Directories

### Components (`src/components/`)

Reusable UI components that can be used across different pages:

- **Button.tsx** - Customizable button with variants (primary, secondary, outline, social)
- **Input.tsx** - Form input with validation error display
- **Header.tsx** - Application header with navigation and user menu
- **MovieCard.tsx** - Movie display card with poster, title, and favorite button
- **MovieGrid.tsx** - Grid layout for displaying multiple movies
- **Loading.tsx** - Loading spinner component
- **ThemeToggle.tsx** - Dark/light mode toggle button
- **LanguageToggle.tsx** - Language switcher (EN/ID)
- **ProtectedRoute.tsx** - Route wrapper for authentication

### Pages (`src/pages/`)

Full page components that represent different routes:

- **LoginPage.tsx** - User login with email/password and social options
- **RegisterPage.tsx** - User registration form
- **HomePage.tsx** - Main page showing movie categories
- **MovieDetailPage.tsx** - Detailed view of a single movie
- **SearchPage.tsx** - Movie search functionality
- **FavoritesPage.tsx** - User's favorite movies list

### Stores (`src/stores/`)

Zustand stores for global state management:

- **authStore.ts** - Authentication state (user, login, logout, register)
- **favoritesStore.ts** - Favorites management with local storage & Firestore sync
- **themeStore.ts** - Theme preference (light/dark mode)

Each store provides:
- State variables
- Actions to modify state
- Persistence (localStorage or Firestore)

### Services (`src/services/`)

External API integration layers:

- **firebase.ts** - Firebase configuration (Auth, Firestore, Analytics)
- **tmdb.ts** - TMDB API client with all movie-related endpoints

### Hooks (`src/hooks/`)

Custom React hooks for reusable logic:

- **useInput.ts** - Form input state management with validation

### Types (`src/types/`)

TypeScript type definitions:

- **auth.ts** - Authentication-related types (User, AuthState)
- **movie.ts** - Movie data types (Movie, MovieDetail, Cast, Credits, etc.)
- **index.ts** - Common types (Theme, Language)

### Routes (`src/routes/`)

- **index.tsx** - Centralized route configuration using React Router's `useRoutes`

### Locales (`src/locales/`)

i18n translation files:

- **en.json** - English translations
- **id.json** - Bahasa Indonesia translations

## Data Flow

### Authentication Flow

1. User submits login/register form
2. Form validation via React Hook Form
3. Firebase Authentication API call
4. Update `authStore` with user data
5. Save to localStorage for persistence
6. Firebase Analytics event logged
7. Navigate to protected route

### Movie Data Flow

1. Component mounts (e.g., HomePage)
2. Fetch data from TMDB API via `tmdb.ts` service
3. Data returned with TypeScript types
4. Component renders with loading/error states
5. User interactions update local/Firestore state

### Favorites Flow

1. User clicks favorite button
2. `favoritesStore` adds/removes movie ID
3. Update localStorage immediately
4. Sync with Firestore (if authenticated)
5. Firebase Analytics event logged
6. UI updates reactively

## State Management

### Local State
- Component-specific state using `useState`
- Form state using React Hook Form

### Global State (Zustand)
- Authentication state
- Favorites list
- Theme preference

### Persistence
- **localStorage** - Theme, favorites, user session (offline-first)
- **Firestore** - Favorites sync across devices (when authenticated)

## Styling Architecture

### TailwindCSS v4
- Utility-first CSS framework
- Dark mode via `dark:` prefix
- Responsive design with breakpoints (sm, md, lg, xl)
- Custom configuration in `tailwind.config.js`

### Theme System
- CSS classes applied to `<html>` element
- `dark` class toggled via `themeStore`
- Persistent across sessions

## Routing Strategy

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
All wrapped with `<ProtectedRoute>` component:
- `/` - Home page
- `/movie/:id` - Movie details
- `/search` - Search page
- `/favorites` - Favorites page

### Route Configuration
Centralized in `src/routes/index.tsx` using React Router v7's `useRoutes` hook for:
- Better code organization
- Easier maintenance
- Type safety
- Lazy loading support (future)

## Testing Strategy

### E2E Tests (Cypress)
Located in `cypress/e2e/`:
- **login.cy.ts** - Login form validation and functionality
- **register.cy.ts** - Registration form tests
- **search.cy.ts** - Movie search functionality
- **theme-language.cy.ts** - Theme and language toggle tests

Run tests:
```bash
npm run test          # Headless mode
npm run test:open     # Interactive mode
npm run test:e2e      # E2E tests only
```

## Build Process

1. **Development**: `npm run dev`
   - Vite dev server with HMR
   - Fast refresh for React components

2. **Production**: `npm run build`
   - TypeScript compilation
   - Vite optimized build
   - Code splitting and minification
   - Output to `dist/` folder

3. **Preview**: `npm run preview`
   - Preview production build locally

## Performance Optimizations

- **Code Splitting** - Routes can be lazy loaded
- **Image Optimization** - TMDB CDN for movie posters
- **Lazy Loading** - Images load on demand
- **Memoization** - React memoization for expensive computations
- **Bundle Size** - Vite's tree-shaking and minification

## Best Practices

### Component Design
- Small, focused components
- Props interface for type safety
- Composition over inheritance
- Accessibility considerations

### State Management
- Keep state as local as possible
- Use Zustand for shared state only
- Persist critical state to storage

### Error Handling
- Try-catch blocks for async operations
- Toast notifications via notistack
- Graceful degradation

### Code Organization
- One component per file
- Group related files together
- Clear naming conventions
- Consistent formatting (Prettier)

## Future Enhancements

- Lazy loading for routes
- Server-side rendering (SSR)
- Progressive Web App (PWA)
- Enhanced caching strategies
- Offline mode improvements
