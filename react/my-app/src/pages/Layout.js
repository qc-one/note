import { useRoutes } from "react-router-dom";
import routes from "../router/index";
function Layout() {
    const element = useRoutes(routes);
    return (
        <div className="layout">
            layout
            {element}
        </div>
    );
}

export default Layout;
