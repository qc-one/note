import { Link, Outlet, useNavigate } from "react-router-dom";

import "./index.scss";

const Layout = () => {
    const navigate = useNavigate();
    const switRouter = (path) => {
        navigate(path);
    };
    return (
        <div className="layout">
            {/* <RouterProvider router={router}></RouterProvider> */}
            <h1>我是layout</h1>
            <Outlet />
            <Link to="/">返回首页</Link>
            {/* <Link to="/login">跳转到登录页</Link> */}
            {/* <Link to="/">跳转到登录页</Link>
            <Link to="/article">跳转到文章页</Link> */}
            <button
                onClick={() => {
                    switRouter("/r");
                }}
            >
                跳转到登录页
            </button>
            <button
                onClick={() => {
                    switRouter("/article");
                }}
            >
                跳转到文章页
            </button>
        </div>
    );
};
export default Layout;
