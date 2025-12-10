import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../layout";

export default function MainRoutes() {
    const mainRoutes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
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