import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SingupPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
        {
        path: '/signup',
        element: <SignupPage />,
    },
]);