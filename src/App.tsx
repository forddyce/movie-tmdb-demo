import { useEffect } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useAuthStore } from "./stores/authStore";
import { useFavoritesStore } from "./stores/favoritesStore";
import { useThemeStore } from "./stores/themeStore";
import { routes } from "./routes";

function AppRoutes() {
    const element = useRoutes([
        ...routes,
        {
            path: "*",
            element: <Navigate to="/" replace />,
        },
    ]);
    return element;
}

function App() {
    const { initializeAuth, user } = useAuthStore();
    const { loadFavorites } = useFavoritesStore();
    const { theme } = useThemeStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        if (user) {
            loadFavorites(user.uid);
        }
    }, [user, loadFavorites]);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <BrowserRouter>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <AppRoutes />
                </div>
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;
