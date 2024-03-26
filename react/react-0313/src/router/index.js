import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Article from "../pages/Article";
import Layout from "../pages/Layout";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                // path: "/login",
                index: true,
                element: <Login />,
            },
            {
                path: "article",
                element: <Article />,
            },
        ],
    },
    // {
    //     path: "/",
    //     element: <App />,
    // },
    // {
    //     path: "/login",
    //     element: <Login />,
    // },
    // {
    //     path: "/article",
    //     element: <Article />,
    // },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
