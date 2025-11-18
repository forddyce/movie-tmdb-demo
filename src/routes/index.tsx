import type { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { MovieDetailPage } from "../pages/MovieDetailPage";
import { SearchPage } from "../pages/SearchPage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: (
                    <>
                        <Header />
                        <main>
                            <Outlet />
                        </main>
                    </>
                ),
                children: [
                    {
                        path: "/",
                        element: <HomePage />,
                    },
                    {
                        path: "/movie/:id",
                        element: <MovieDetailPage />,
                    },
                    {
                        path: "/search",
                        element: <SearchPage />,
                    },
                    {
                        path: "/favorites",
                        element: <FavoritesPage />,
                    },
                ],
            },
        ],
    },
];
