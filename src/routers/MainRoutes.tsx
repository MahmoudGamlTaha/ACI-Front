import Layout from "@/layout";
import { getToken } from "@/lib/getToken";
import { lazy } from "react";
const LazyHome = lazy(() => import("@/pages/home"));
const LazyLogin = lazy(() => import("@/pages/auth/LoginPage"));
const LazySignUp = lazy(() => import("@/pages/auth/SignUp"));
const LazySideTabsLayout = lazy(() => import("@/pages/exporter-dashboard/ExporterDashboardSideTabsLayout"));
import { RouteObject, useRoutes } from "react-router-dom";

export default function MainRoutes() {
    const mainRoutes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <LazyHome />,
                },
                {
                    path: "/exporter-dashboard",
                    element: <LazySideTabsLayout />
                }
            ],
        },
    ];

    const authRoutes: RouteObject[] = [
        {
            path: "/",
            element: <LazyLogin />,
        },
        {
            path: "/login",
            element: <LazyLogin />,
        },
        {
            path: "/sign-up",
            element: <LazySignUp />,
        },
    ];

    return useRoutes(getToken() ? mainRoutes : authRoutes);

}