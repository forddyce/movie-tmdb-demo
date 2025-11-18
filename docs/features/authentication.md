# Authentication

Worlder provides a complete authentication system powered by Firebase.

## Features

- Email/Password registration and login
- Social login (Google, Facebook, Apple)
- Session persistence
- Protected routes
- User profile management

## Usage

### Email/Password Registration

```typescript
import { useAuthStore } from './stores/authStore';

const { register } = useAuthStore();
await register('email@example.com', 'password123', 'Display Name');
```

### Email/Password Login

```typescript
const { login } = useAuthStore();
await login('email@example.com', 'password123');
```

### Social Login

```typescript
const { loginWithSocial } = useAuthStore();
await loginWithSocial('google'); // or 'facebook', 'apple'
```

### Logout

```typescript
const { logout } = useAuthStore();
await logout();
```

## Auth Store

The authentication state is managed by Zustand:

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithSocial: (provider: 'google' | 'facebook' | 'apple') => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
}
```

## Protected Routes

Routes are protected using the `ProtectedRoute` component:

```typescript
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<HomePage />} />
  <Route path="/favorites" element={<FavoritesPage />} />
</Route>
```

## Session Management

- Sessions are persisted in local storage
- Firebase handles token refresh automatically
- User data syncs across tabs

## Security

- Passwords are hashed by Firebase
- OAuth tokens are securely managed
- Firebase Analytics tracks authentication events