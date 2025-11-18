import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search as SearchIcon } from "lucide-react";
import { tmdbApi } from "../services/tmdb";
import { MovieGrid } from "../components/MovieGrid";
import { Loading } from "../components/Loading";
import type { Movie } from "../types/movie";

export const SearchPage = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await tmdbApi.searchMovies(query);
      setMovies(response.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {t("navigation.search")}
        </h1>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("movies.search")}
            className="w-full px-6 py-4 pr-14 rounded-lg border-2 border-gray-300 dark:border-gray-600 
              focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <SearchIcon className="w-6 h-6" />
          </button>
        </form>
      </div>

      {isLoading && <Loading />}

      {!isLoading && hasSearched && movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("movies.noResults")}
          </p>
        </div>
      )}

      {!isLoading && movies.length > 0 && (
        <MovieGrid movies={movies} title={`${t("movies.search")} "${query}"`} />
      )}
    </div>
  );
};
