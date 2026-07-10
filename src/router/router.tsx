import { createBrowserRouter } from "react-router-dom";
import WalletPage from "../pages/WalletPage";
import { loader as walletLoader } from "../pages/WalletPage";
import LoginPage from "../pages/LoginPage";
import SignupPage, { action as signupAction } from "../pages/SignupPage";
import AssetPricePage from "../pages/AssetsPricePage";
import { loader as assetPriceLoader } from "../pages/AssetsPricePage";
import Layout from "../components/DashboardLayout";
import { action as walletAction } from "../pages/WalletPage";
import { action as loginAction } from "../pages/LoginPage";

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
        action: loginAction,
    },
    {
        path: '/signup',
        element: <SignupPage />,
        action: signupAction,
    },
]);