// import logo from "./logo.svg";
import "./App.css";
import {
    Route,
    Link,
    Routes,
    // BrowserRouter,
    // NavLink,
    // createBrowserRouter,
    // RouterProvider,
    // useRoutes,
    // Navigate,
    // Outlet,
} from "react-router-dom";

// import routes from "./router/index";

import Home from "./pages/Home";
import About from "./pages/About";

// const Router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />,
//     },
//     { path: "/about", element: <About /> },
// ]);

function App() {
    // const element = useRoutes(routes);
    return (
        <div className="App">
            <div>跳转到home</div>
            {/* <NavLink to="/home">首页</NavLink> */}
            <Link to="/">首页</Link>
            <Link to="/about">关于</Link>
            {/* {element} */}
            {/* 按照规则配置路由 */}
            {/* <BrowserRouter> */}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Routes>
            {/* </BrowserRouter> */}
            {/* <RouterProvider router={Router} /> */}
        </div>
    );
}

export default App;
