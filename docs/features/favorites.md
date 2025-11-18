# Favorites System

Save and manage your favorite movies with persistence across devices.

## Features

- Add/remove movies from favorites
- Local storage for offline access
- Firestore sync for cross-device access
- Favorites page to view all saved movies
- Favorite indicator on movie cards

## Usage

### Add to Favorites

```typescript
import { useFavoritesStore } from './stores/favoritesStore';

const { addFavorite } = useFavoritesStore();
const { user } = useAuthStore();

await addFavorite(movieId, user?.uid);
```

### Remove from Favorites

```typescript
const { removeFavorite } = useFavoritesStore();
await removeFavorite(movieId, user?.uid);
```

### Check if Favorite

```typescript
const { isFavorite } = useFavoritesStore();
const isLiked = isFavorite(movieId); // returns boolean
```

## Favorites Store

Managed by Zustand:

```typescript
interface FavoritesState {
  favorites: number[];
  isLoading: boolean;
  addFavorite: (movieId: number, userId?: string) => Promise<void>;
  removeFavorite: (movieId: number, userId?: string) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
  loadFavorites: (userId?: string) => Promise<void>;
}
```

## Data Persistence

### Local Storage

Favorites are stored in browser local storage:

```typescript
const FAVORITES_STORAGE_KEY = 'worlder_favorites';
localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
```

### Firestore Sync

For logged-in users, favorites sync to Firestore:

```typescript
const docRef = doc(db, 'favorites', userId);
await setDoc(docRef, {
  movies: [{ movieId, addedAt: Date.now() }],
});
```

## Firestore Structure

```
favorites/
  {userId}/
    movies: [
      { movieId: number, addedAt: number }
    ]
```

## Favorites Page

Displays all favorite movies:
- Grid layout of movie cards
- Empty state when no favorites
- Remove button on each card
- Responsive design

## Analytics

Firebase Analytics tracks:
- `add_to_favorites` event
- `remove_from_favorites` event