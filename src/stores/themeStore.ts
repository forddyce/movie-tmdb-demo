import { create } from "zustand";
import type { Theme } from "../types";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = "worlder_theme";

const getThemeFromStorage = (): Theme => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored as Theme) || "dark";
};

const saveThemeToStorage = (theme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: getThemeFromStorage(),

    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            saveThemeToStorage(newTheme);
            return { theme: newTheme };
        }),

    setTheme: (theme: Theme) => {
        saveThemeToStorage(theme);
        set({ theme });
    },
}));
