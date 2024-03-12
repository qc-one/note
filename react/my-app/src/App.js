// import logo from "./logo.svg";
import "./App.css";
import {
    // Route,
    // Link,
    // Routes,
    // BrowserRouter,
    NavLink,
    // useRoutes,
    // Navigate,
    // Outlet,
} from "react-router-dom";

import routes from "./router/index";

function App() {
    // const element = useRoutes(routes);
    return (
        <div className="App">
            <div>跳转到home</div>
            <NavLink to="/home">首页</NavLink>
            {/* {element} */}
        </div>
    );
}

export default App;
