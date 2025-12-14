import Layout from "@/layout";
import path from "node:path";
import { lazy } from "react";
const LazyHome = lazy(() => import("@/pages/home"));
const LazyLogin = lazy(() => import("@/pages/auth/LoginPage"));
const LazySignUp = lazy(() => import("@/pages/auth/SignUp"));
const LazySideTabsLayout = lazy(() => import("@/pages/logged-in-home/SideTabsLayout"));
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
                {
                    path: "/sign-up",
                    element: <LazySignUp />,
                },
                {
                    path: "/logged-in-home",
                    element: <LazySideTabsLayout />
                }
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