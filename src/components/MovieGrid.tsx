import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
    movies: Movie[];
    title?: string;
}

export const MovieGrid = ({ movies, title }: MovieGridProps) => {
    return (
        <div className="mb-12">
            {title && (
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {title}
                </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};
