import { create } from "zustand";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { logEvent } from "firebase/analytics";
import { analytics } from "../services/firebase";
import type { FavoriteMovie } from "../types/movie";

interface FavoritesState {
    favorites: number[];
    isLoading: boolean;
    addFavorite: (movieId: number, userId?: string) => Promise<void>;
    removeFavorite: (movieId: number, userId?: string) => Promise<void>;
    isFavorite: (movieId: number) => boolean;
    loadFavorites: (userId?: string) => Promise<void>;
}

const FAVORITES_STORAGE_KEY = "worlder_favorites";

const saveFavoritesToStorage = (favorites: number[]) => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

const getFavoritesFromStorage = (): number[] => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
    favorites: getFavoritesFromStorage(),
    isLoading: false,

    loadFavorites: async (userId?: string) => {
        set({ isLoading: true });

        if (userId) {
            try {
                const docRef = doc(db, "favorites", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const movieIds =
                        data.movies?.map((m: FavoriteMovie) => m.movieId) || [];
                    set({ favorites: movieIds });
                    saveFavoritesToStorage(movieIds);
                }
            } catch (error) {
                console.error("Error loading favorites from Firestore:", error);
            }
        }

        set({ isLoading: false });
    },

    addFavorite: async (movieId: number, userId?: string) => {
        const { favorites } = get();

        if (favorites.includes(movieId)) return;

        const newFavorites = [...favorites, movieId];
        set({ favorites: newFavorites });
        saveFavoritesToStorage(newFavorites);

        if (userId) {
            try {
                const docRef = doc(db, "favorites", userId);
                const favorite: FavoriteMovie = {
                    movieId,
                    addedAt: Date.now(),
                };

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const existingMovies = docSnap.data().movies || [];
                    await updateDoc(docRef, {
                        movies: [...existingMovies, favorite],
                    });
                } else {
                    await setDoc(docRef, {
                        movies: [favorite],
                    });
                }
            } catch (error) {
                console.error("Error adding favorite to Firestore:", error);
            }
        }

        if (analytics) {
            logEvent(analytics, "add_to_favorites", { movie_id: movieId });
        }
    },

    removeFavorite: async (movieId: number, userId?: string) => {
        const { favorites } = get();
        const newFavorites = favorites.filter((id) => id !== movieId);

        set({ favorites: newFavorites });
        saveFavoritesToStorage(newFavorites);

        if (userId) {
            try {
                const docRef = doc(db, "favorites", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const existingMovies = docSnap.data().movies || [];
                    const updatedMovies = existingMovies.filter(
                        (m: FavoriteMovie) => m.movieId !== movieId
                    );
                    await updateDoc(docRef, {
                        movies: updatedMovies,
                    });
                }
            } catch (error) {
                console.error("Error removing favorite from Firestore:", error);
            }
        }

        if (analytics) {
            logEvent(analytics, "remove_from_favorites", { movie_id: movieId });
        }
    },

    isFavorite: (movieId: number) => {
        return get().favorites.includes(movieId);
    },
}));
