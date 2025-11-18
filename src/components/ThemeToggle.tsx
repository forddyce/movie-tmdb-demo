import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../stores/themeStore";

export const ThemeToggle = () => {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={t("theme.toggle")}
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
        </button>
    );
};
