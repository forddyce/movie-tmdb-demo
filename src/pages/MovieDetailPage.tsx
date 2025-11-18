import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Calendar, Star, Clock, Play } from "lucide-react";
import { tmdbApi, getImageUrl } from "../services/tmdb";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useAuthStore } from "../stores/authStore";
import { Loading } from "../components/Loading";
import type { MovieDetail, Credits, Video } from "../types/movie";

export const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    const [trailer, setTrailer] = useState<Video | null>(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const movieId = Number(id);
    const favorite = isFavorite(movieId);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!id) return;

            try {
                const [movieData, creditsData, videosData] = await Promise.all([
                    tmdbApi.getMovieDetails(movieId),
                    tmdbApi.getMovieCredits(movieId),
                    tmdbApi.getMovieVideos(movieId),
                ]);

                setMovie(movieData);
                setCredits(creditsData);

                const youtubeTrailer = videosData.results.find(
                    (video) =>
                        video.type === "Trailer" && video.site === "YouTube"
                );
                setTrailer(youtubeTrailer || null);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, movieId]);

    const handleFavoriteClick = () => {
        if (favorite) {
            removeFavorite(movieId, user?.uid);
        } else {
            addFavorite(movieId, user?.uid);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!movie) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-gray-600 dark:text-gray-400">
                    {t("common.error")}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div
                className="relative h-[400px] md:h-[600px] bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${getImageUrl(
                        movie.backdrop_path,
                        "original"
                    )})`,
                }}
            >
                <div className="container mx-auto px-4 h-full flex items-end pb-8">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            className="w-48 md:w-64 rounded-lg shadow-2xl"
                        />
                        <div className="flex-1 text-white">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-lg md:text-xl italic mb-4 text-gray-300">
                                    {movie.tagline}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>
                                        {new Date(
                                            movie.release_date
                                        ).getFullYear()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    <span>
                                        {movie.vote_average.toFixed(1)}/10
                                    </span>
                                </div>
                                {movie.runtime && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        <span>
                                            {movie.runtime}{" "}
                                            {t("movies.minutes")}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleFavoriteClick}
                                    className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${
                                            favorite
                                                ? "fill-red-500 text-red-500"
                                                : ""
                                        }`}
                                    />
                                    <span>
                                        {favorite
                                            ? t("movies.removeFromFavorites")
                                            : t("movies.addToFavorites")}
                                    </span>
                                </button>
                                {trailer && (
                                    <button
                                        onClick={() => setShowTrailer(true)}
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                    >
                                        <Play className="w-5 h-5" />
                                        <span>{t("movies.trailer")}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        {t("movies.overview")}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {movie.overview}
                    </p>
                </div>

                {credits && credits.cast.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                            {t("movies.cast")}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {credits.cast.slice(0, 12).map((actor) => (
                                <div key={actor.id} className="text-center">
                                    <div className="relative aspect-[2/3] mb-2 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        <img
                                            src={getImageUrl(
                                                actor.profile_path,
                                                "w200"
                                            )}
                                            alt={actor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                                        {actor.name}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {actor.character}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showTrailer && trailer && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowTrailer(false)}
                >
                    <div
                        className="w-full max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative pt-[56.25%]">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="mt-4 w-full px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
