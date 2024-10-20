import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../layout/CommonLayout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import HomePage from "../pages/HomePage";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <CommonLayout></CommonLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>,
            },
        ]
    }
])

export default Routes;