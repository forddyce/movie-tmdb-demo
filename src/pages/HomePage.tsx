import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { tmdbApi } from "../services/tmdb";
import { MovieGrid } from "../components/MovieGrid";
import { Loading } from "../components/Loading";
import type { Movie } from "../types/movie";

export const HomePage = () => {
    const { t } = useTranslation();
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [popular, nowPlaying, upcoming, topRated] =
                    await Promise.all([
                        tmdbApi.getPopularMovies(),
                        tmdbApi.getNowPlayingMovies(),
                        tmdbApi.getUpcomingMovies(),
                        tmdbApi.getTopRatedMovies(),
                    ]);

                setPopularMovies(popular.results);
                setNowPlayingMovies(nowPlaying.results);
                setUpcomingMovies(upcoming.results);
                setTopRatedMovies(topRated.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <MovieGrid movies={popularMovies} title={t("movies.popular")} />
            <MovieGrid
                movies={nowPlayingMovies}
                title={t("movies.nowPlaying")}
            />
            <MovieGrid movies={upcomingMovies} title={t("movies.upcoming")} />
            <MovieGrid movies={topRatedMovies} title={t("movies.topRated")} />
        </div>
    );
};
