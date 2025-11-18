import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "../stores/favoritesStore";
import { tmdbApi } from "../services/tmdb";
import { MovieGrid } from "../components/MovieGrid";
import { Loading } from "../components/Loading";
import type { Movie } from "../types/movie";

export const FavoritesPage = () => {
    const { t } = useTranslation();
    const { favorites } = useFavoritesStore();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            setIsLoading(true);
            try {
                const moviePromises = favorites.map((id) =>
                    tmdbApi.getMovieDetails(id)
                );
                const moviesData = await Promise.all(moviePromises);
                setMovies(moviesData as Movie[]);
            } catch (error) {
                console.error("Error fetching favorite movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (favorites.length > 0) {
            fetchFavoriteMovies();
        } else {
            setIsLoading(false);
        }
    }, [favorites]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                {t("favorites.title")}
            </h1>

            {movies.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mb-4">
                        <svg
                            className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {t("favorites.empty")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t("favorites.emptyDescription")}
                    </p>
                </div>
            ) : (
                <MovieGrid movies={movies} />
            )}
        </div>
    );
};
