import axios from "axios";
import type {
    MoviesResponse,
    MovieDetail,
    Credits,
    Video,
} from "../types/movie";

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    },
});

export const tmdbApi = {
    getPopularMovies: async (page = 1): Promise<MoviesResponse> => {
        const { data } = await tmdbClient.get("/movie/popular", {
            params: { page },
        });
        return data;
    },

    getNowPlayingMovies: async (page = 1): Promise<MoviesResponse> => {
        const { data } = await tmdbClient.get("/movie/now_playing", {
            params: { page },
        });
        return data;
    },

    getUpcomingMovies: async (page = 1): Promise<MoviesResponse> => {
        const { data } = await tmdbClient.get("/movie/upcoming", {
            params: { page },
        });
        return data;
    },

    getTopRatedMovies: async (page = 1): Promise<MoviesResponse> => {
        const { data } = await tmdbClient.get("/movie/top_rated", {
            params: { page },
        });
        return data;
    },

    searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
        const { data } = await tmdbClient.get("/search/movie", {
            params: { query, page },
        });
        return data;
    },

    getMovieDetails: async (movieId: number): Promise<MovieDetail> => {
        const { data } = await tmdbClient.get(`/movie/${movieId}`);
        return data;
    },

    getMovieCredits: async (movieId: number): Promise<Credits> => {
        const { data } = await tmdbClient.get(`/movie/${movieId}/credits`);
        return data;
    },

    getMovieVideos: async (movieId: number): Promise<{ results: Video[] }> => {
        const { data } = await tmdbClient.get(`/movie/${movieId}/videos`);
        return data;
    },
};

export const getImageUrl = (
    path: string | null,
    size: "w200" | "w500" | "original" = "w500"
): string => {
    if (!path) return "/placeholder-movie.jpg";
    return `https://image.tmdb.org/t/p/${size}${path}`;
};
