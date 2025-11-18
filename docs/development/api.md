# API Reference

Complete API reference for Worlder's core functionality.

## TMDB Service

### `tmdbApi.getPopularMovies(page?: number)`

Fetch popular movies.

**Parameters:**
- `page` (optional): Page number, default 1

**Returns:** `Promise<MoviesResponse>`

**Example:**
```typescript
const { results } = await tmdbApi.getPopularMovies(1);
```

### `tmdbApi.getNowPlayingMovies(page?: number)`

Fetch movies currently in theaters.

**Returns:** `Promise<MoviesResponse>`

### `tmdbApi.getUpcomingMovies(page?: number)`

Fetch upcoming movies.

**Returns:** `Promise<MoviesResponse>`

### `tmdbApi.getTopRatedMovies(page?: number)`

Fetch top-rated movies.

**Returns:** `Promise<MoviesResponse>`

### `tmdbApi.searchMovies(query: string, page?: number)`

Search for movies by keyword.

**Parameters:**
- `query`: Search string
- `page` (optional): Page number

**Returns:** `Promise<MoviesResponse>`

**Example:**
```typescript
const results = await tmdbApi.searchMovies('Avengers');
```

### `tmdbApi.getMovieDetails(movieId: number)`

Get detailed information about a specific movie.

**Parameters:**
- `movieId`: TMDB movie ID

**Returns:** `Promise<MovieDetail>`

### `tmdbApi.getMovieCredits(movieId: number)`

Get cast and crew information.

**Returns:** `Promise<Credits>`

### `tmdbApi.getMovieVideos(movieId: number)`

Get trailers and videos.

**Returns:** `Promise<{ results: Video[] }>`

### `getImageUrl(path: string | null, size?: 'w200' | 'w500' | 'original')`

Generate TMDB image URL.

**Parameters:**
- `path`: Image path from TMDB
- `size` (optional): Image size, default 'w500'

**Returns:** `string`

## Auth Store

### `useAuthStore()`

Access authentication state and methods.

**State:**
```typescript
{
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

**Methods:**

#### `login(email: string, password: string): Promise<void>`

Log in with email and password.

**Example:**
```typescript
const { login } = useAuthStore();
await login('user@example.com', 'password123');
```

#### `register(email: string, password: string, displayName: string): Promise<void>`

Register a new user.

#### `loginWithSocial(provider: 'google' | 'facebook' | 'apple'): Promise<void>`

Log in with social provider.

#### `logout(): Promise<void>`

Log out the current user.

#### `initializeAuth(): void`

Initialize authentication listener.

## Favorites Store

### `useFavoritesStore()`

Access favorites state and methods.

**State:**
```typescript
{
  favorites: number[];
  isLoading: boolean;
}
```

**Methods:**

#### `addFavorite(movieId: number, userId?: string): Promise<void>`

Add movie to favorites.

**Example:**
```typescript
const { addFavorite } = useFavoritesStore();
const { user } = useAuthStore();
await addFavorite(123, user?.uid);
```

#### `removeFavorite(movieId: number, userId?: string): Promise<void>`

Remove movie from favorites.

#### `isFavorite(movieId: number): boolean`

Check if movie is in favorites.

#### `loadFavorites(userId?: string): Promise<void>`

Load favorites from Firestore.

## Theme Store

### `useThemeStore()`

Access theme state and methods.

**State:**
```typescript
{
  theme: 'light' | 'dark';
}
```

**Methods:**

#### `toggleTheme(): void`

Toggle between light and dark theme.

#### `setTheme(theme: Theme): void`

Set specific theme.

## Custom Hooks

### `useInput(options?: UseInputProps)`

Form input management hook.

**Parameters:**
```typescript
interface UseInputProps {
  initialValue?: string;
  validation?: (value: string) => string | null;
}
```

**Returns:**
```typescript
{
  value: string;
  error: string | null;
  touched: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  reset: () => void;
  setValue: (value: string) => void;
}
```

**Example:**
```typescript
const email = useInput({
  validation: validators.email(),
});

<Input
  value={email.value}
  onChange={email.onChange}
  onBlur={email.onBlur}
  error={email.error}
  touched={email.touched}
/>
```

### Validators

Pre-built validation functions:

```typescript
validators.required(message?: string)
validators.email(message?: string)
validators.minLength(length: number, message?: string)
validators.maxLength(length: number, message?: string)
validators.combine(...validators)
```

## Type Definitions

### Movie Types

```typescript
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  // ... more fields
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
```

### Auth Types

```typescript
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: 'email' | 'google' | 'facebook' | 'apple';
}
```
