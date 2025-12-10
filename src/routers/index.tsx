import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import MainRoutes from "./MainRoutes";

const router = createBrowserRouter([
    {
        path: "/*", // wildcard so HandleMainRoutes handles children
        element: <MainRoutes />,
        errorElement: <ErrorPage />,
    },
]);

export default router;