# Movie Browsing

Browse and discover movies from The Movie Database (TMDB).

## Features

- **Popular Movies** - Currently trending movies
- **Now Playing** - Movies in theaters
- **Upcoming** - Soon-to-be-released movies
- **Top Rated** - Highest-rated movies of all time
- **Search** - Find any movie by keyword
- **Movie Details** - Comprehensive information about each movie

## Home Page

The home page displays four categories of movies:

```typescript
const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
```

## Search Functionality

Search for movies using keywords:

```typescript
import { tmdbApi } from './services/tmdb';

const results = await tmdbApi.searchMovies('Avengers');
```

## Movie Details

Each movie detail page shows:

- Title and tagline
- Release year
- Rating (out of 10)
- Runtime
- Genres
- Overview/Synopsis
- Cast (with photos)
- Trailer (YouTube embed)
- Backdrop and poster images

## API Integration

The TMDB service provides these methods:

```typescript
export const tmdbApi = {
  getPopularMovies: (page = 1) => Promise<MoviesResponse>,
  getNowPlayingMovies: (page = 1) => Promise<MoviesResponse>,
  getUpcomingMovies: (page = 1) => Promise<MoviesResponse>,
  getTopRatedMovies: (page = 1) => Promise<MoviesResponse>,
  searchMovies: (query: string, page = 1) => Promise<MoviesResponse>,
  getMovieDetails: (movieId: number) => Promise<MovieDetail>,
  getMovieCredits: (movieId: number) => Promise<Credits>,
  getMovieVideos: (movieId: number) => Promise<{ results: Video[] }>,
};
```

## Image Handling

Images are loaded from TMDB CDN:

```typescript
const getImageUrl = (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
```

## Movie Card Component

Reusable component for displaying movie cards:

- Poster image
- Title
- Release year
- Rating
- Favorite button
- Hover effects