import { lazy } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import ErrorPage from "@/components/ErrorPage";
import PrivateLayout from "@/layout/privateLayout";
import PublicLayout from "@/layout/publicLayout";
import { getToken } from "@/lib/getToken";
import { useUserStore } from "@/stores/useUserStores";
import ProtectedRoute from "./ProtectedRoute";

// Lazy pages
const LazyHome = lazy(() => import("@/pages/home"));
const LazyLogin = lazy(() => import("@/pages/auth/LoginPage"));
const LazySignUp = lazy(() => import("@/pages/auth/signUp"));
const LazyAdminDashboard = lazy(() => import("@/pages/admin-dashboard"));
const LazyExporterDashboard = lazy(
    () => import("@/pages/exporter-dashboard")
);

export default function MainRoutes() {
    const userType = useUserStore((s) => s.user.userType);

    // ⛔ IMPORTANT: wait until userType is ready
    if (getToken() && !userType) {
        return <div>Loading...</div>;
    }

    const mainRoutes: RouteObject[] = [
        {
            path: "/",
            element: <PrivateLayout />,
            action: () => {
                if (getToken() && !userType) {
                    return <div>Loading...</div>;
                }
            },
            children: [
                {
                    index: true,
                    element:
                        userType === "admin"
                            ? <LazyAdminDashboard />
                            : <LazyExporterDashboard />,
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
        {
            path: "*",
            element: <ErrorPage />,
        },
    ];

    const authRoutes: RouteObject[] = [
        {
            path: "/",
            element: <PublicLayout />,
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
        {
            path: "*",
            element: <ErrorPage />,
        },
    ];

    return useRoutes(getToken() ? mainRoutes : authRoutes);
}
