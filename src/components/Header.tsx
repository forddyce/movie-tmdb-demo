import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Heart, Search, LogOut } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export const Header = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { user, logout } = useAuthStore();

    const navItems = [
        { path: "/", label: t("navigation.home"), icon: Home },
        { path: "/favorites", label: t("navigation.favorites"), icon: Heart },
        { path: "/search", label: t("navigation.search"), icon: Search },
    ];

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                    >
                        {t("app.title")}
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                    ${
                        isActive
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <LanguageToggle />

                        {user && (
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex items-center gap-2">
                                    {user.photoURL && (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || ""}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    )}
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="hidden md:inline">
                                        {t("auth.logout")}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="md:hidden flex items-center justify-around mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors
                  ${
                      isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                  }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-xs font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};
