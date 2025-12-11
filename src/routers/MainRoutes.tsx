import Layout from "@/layout";
import { lazy } from "react";
const LazyHome = lazy(() => import("@/pages/home"));
const LazyLogin = lazy(() => import("@/pages/auth/LoginPage"));
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
                    path: "/login",
                    element: <LazyLogin />,
                },
            ],
        },
    ];

    const authRoutes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
        },
    ];

    return useRoutes(true ? mainRoutes : authRoutes);

}