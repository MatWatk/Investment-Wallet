import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import Layout from "../components/DashboardLayout";

import { action as walletPageAction } from "../pages/WalletPage/action";
import { action as loginAction } from "../pages/LoginPage/action";
import { action as signupAction } from "../pages/SignupPage/action";

import { loader as walletPageLoader } from "../pages/WalletPage/loader";
import { loader as assetPricePageLoader } from "../pages/AssetPricePage/loader";
import { loader as loginPageLoader } from "../pages/LoginPage/loader";
import { loader as signupPageLoader } from "../pages/SignupPage/loader";
import { loader as depositLoader } from "../pages/DepositPage/loader";

import RouterError from "./RouteError";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const module = await import('../pages/WalletPage/WalletPage');
                    return {
                        Component: module.default,
                        loader: walletPageLoader,
                        action: walletPageAction
                    };
                },
                errorElement: <RouterError type="walletData" />
            },
            {
                path: 'assets-price-list',
                lazy: async () => {
                    const module = await import('../pages/AssetPricePage/AssetsPricePage');
                    return {
                        Component: module.default,
                        loader: assetPricePageLoader
                    };
                },
                errorElement: <RouterError type="assetPriceData" />
            },
            {
                path: 'deposit-page',
                lazy: async () => {
                    const module = await import('../pages/DepositPage/DepositPage');
                    return {
                        Component: module.default,
                        loader: depositLoader
                    };
                },
                errorElement: <RouterError type="depositPage" />
            },
        ]
    },
    {
        path: '/login',
        element: <LoginPage />,
        action: loginAction,
        loader: loginPageLoader,
        errorElement: <RouterError type="loginPage" />
    },
    {
        path: '/signup',
        lazy: async () => {
            const module = await import('../pages/SignupPage/SignupPage');
            return {
                Component: module.default,
                action: signupAction,
                loader: signupPageLoader
            };
        },
        errorElement: <RouterError type="signupPage" />
    },
]);