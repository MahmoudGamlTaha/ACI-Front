import ErrorPage from "@/components/ErrorPage";
import PrivateLayout from "@/layout/privateLayout";
import PublicLayout from "@/layout/publicLayout";
import { getToken } from "@/lib/getToken";
import { lazy } from "react";
const LazyHome = lazy(() => import("@/pages/home"));
const LazyLogin = lazy(() => import("@/pages/auth/LoginPage"));
const LazySignUp = lazy(() => import("@/pages/auth/signUp"));
const LazySideTabsLayout = lazy(() => import("@/pages/exporter-dashboard/ExporterDashboardSideTabsLayout"));
import { RouteObject, useRoutes } from "react-router-dom";

export default function MainRoutes() {
    const mainRoutes: RouteObject[] = [
        {
            path: "/",
            element: <PrivateLayout />,
            children: [
                {
                    path: "/",
                    element: <LazySideTabsLayout />,
                },
                {
                    path: "/exporter-dashboard",
                    element: <LazySideTabsLayout />
                }
            ],
        },
        {
            path: "*",
            element: <ErrorPage />
        }
    ];

    const authRoutes: RouteObject[] = [

        {
            path: "/",
            element: <PublicLayout />,
            children: [
                {
                    path: "/",
                    element: <LazyHome />,
                },
                {
                    path: "/login",
                    element: <LazyLogin />,
                },
                {
                    path: "/sign-up",
                    element: <LazySignUp />,
                },

            ]
        },
        {
            path: "*",
            element: <ErrorPage />
        }
    ]

    return useRoutes(getToken() ? mainRoutes : authRoutes);

}