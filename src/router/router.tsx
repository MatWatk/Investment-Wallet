import { createBrowserRouter } from "react-router-dom";
import WalletPage from "../pages/WalletPage";
import { loader as walletLoader } from "../pages/WalletPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import AssetPricePage from "../pages/AssetsPricePage";
import { loader as assetPriceLoader } from "../pages/AssetsPricePage";
import Layout from "../components/DashboardLayout";
import { action as walletAction } from "../pages/WalletPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <WalletPage />,
                loader: walletLoader,
                action: walletAction,
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