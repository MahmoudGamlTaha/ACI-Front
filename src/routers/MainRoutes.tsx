import { lazy } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import { getToken } from "@/lib/getToken";
import { useUserStore } from "@/stores/useUserStores";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy pages
const LazyHome = lazy(() => import("@/pages/home"));
const LazyLogin = lazy(() => import("@/pages/auth/LoginPage"));
const LazySignUp = lazy(() => import("@/pages/auth/signUp"));
const LazyPrivateLayout = lazy(() => import("@/layout/privateLayout"));
const LazyPublicLayout = lazy(() => import("@/layout/publicLayout"));
const LazyAdminDashboard = lazy(() => import("@/pages/admin-dashboard"));
const LazyExporterDashboard = lazy(
    () => import("@/pages/exporter-dashboard")
);

export default function MainRoutes() {
    const { user: userStore } = useUserStore();

    if (getToken() && !userStore?.userType) {
        return <LoadingSpinner />;
    }

    const mainRoutes: RouteObject[] = [
        {
            path: "/",
            element: <LazyPrivateLayout />,            
            children: [
                {
                    index: true,
                    element:
                        userStore?.userType === "admin" ? (
                            <ProtectedRoute byType={["admin"]}>
                                <LazyAdminDashboard />
                            </ProtectedRoute>
                        ) : (
                            <ProtectedRoute byType={["exporter", "importer"]}>
                                <LazyExporterDashboard />
                            </ProtectedRoute>
                        ),
                },

                {
                    path: "admin-dashboard",
                    element: (
                        <ProtectedRoute byType={["admin"]}>
                            <LazyAdminDashboard />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "exporter-dashboard",
                    element: (
                        <ProtectedRoute byType={["exporter", "importer"]}>
                            <LazyExporterDashboard />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
        // {
        //     path: "*",
        //     element: <ErrorPage />,
        // }

    ];

    const authRoutes: RouteObject[] = [
        {
            path: "/",
            element: <LazyPublicLayout />,
            children: [
                {
                    index: true,
                    element: <LazyHome />,
                },
                {
                    path: "login",
                    element: <LazyLogin />,
                },
                {
                    path: "sign-up",
                    element: <LazySignUp />,
                },
            ],
        },
        // {
        //     path: "*",
        //     element: <ErrorPage />,
        // },
    ];

    return useRoutes(getToken() ? mainRoutes : authRoutes);
}
