import { lazy } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import AuthProvider from '@/components/authProvider';
const Home = lazy(() => import("../pages/Home.js"));
const Layout = lazy(() => import("../pages/Layout.js"));
// const Donate = lazy(() => import('@/pages/donate/index'))

const routers = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
        ],
    },
    // {
    //     path: "/donate",
    //     element: (
    //         <AuthProvider>
    //             <Donate />
    //         </AuthProvider>
    //     ),
    // },
    // {
    //     path: "/login",
    //     Component: lazy(() => import("@/pages/login/index")),
    // },
    {
        path: "*",
        Component: lazy(() => import("../pages/Home.js")),
    },
];

export default routers;
