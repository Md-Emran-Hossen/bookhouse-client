import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../layout/CommonLayout";
import LoginLayout from "../layout/LoginLayout";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/loginPage/RegisterPage";



const routes = createBrowserRouter([
  {
    path: "/",
       element: <CommonLayout></CommonLayout>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        // element: <HomePage></HomePage>,
        // loader: () => fetch(`http://localhost:5000/books`),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <LoginLayout />,
    children: [
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
    ],
  },
 
])

export default routes;