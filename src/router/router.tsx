import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import AssetPricePage from "../pages/AssetsPricePage";
import { loader as assetPriceLoader } from "../pages/AssetsPricePage";
import Layout from "../components/DashboardLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'assets-price-list',
                element: <AssetPricePage />,
                loader: assetPriceLoader,
            },
        ]
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