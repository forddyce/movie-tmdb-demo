import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { getImageUrl } from "../services/tmdb";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useAuthStore } from "../stores/authStore";
import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const { user } = useAuthStore();
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (favorite) {
            removeFavorite(movie.id, user?.uid);
        } else {
            addFavorite(movie.id, user?.uid);
        }
    };

    return (
        <Link
            to={`/movie/${movie.id}`}
            className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors z-10"
                >
                    <Heart
                        className={`w-5 h-5 ${
                            favorite
                                ? "fill-red-500 text-red-500"
                                : "text-white"
                        }`}
                    />
                </button>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white line-clamp-1">
                    {movie.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
