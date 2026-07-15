import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Layout from "../components/DashboardLayout";
import { action as loginAction } from "../pages/LoginPage";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../constants/translations";

function RouterError({ type }: { type: keyof typeof translations.english.routerErrors }) {
    const language = useLanguage();
    return <div>{translations[language].routerErrors[type]}</div>;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const module = await import('../pages/WalletPage');
                    return {
                        Component: module.default,
                        loader: module.loader,
                        action: module.action
                    };
                },
                errorElement: <RouterError type="walletData" />
            },
            {
                path: 'assets-price-list',
                lazy: async () => {
                    const module = await import('../pages/AssetsPricePage');
                    return {
                        Component: module.default,
                        loader: module.loader
                    };
                },
                errorElement: <RouterError type="assetPriceData" />
            },
        ]
    },
    {
        path: '/login',
        element: <LoginPage />,
        action: loginAction,
        errorElement: <RouterError type="loginPage" />
    },
    {
        path: '/signup',
        lazy: async () => {
            const module = await import('../pages/SignupPage');
            return {
                Component: module.default,
                action: module.action
            };
        },
        errorElement: <RouterError type="signupPage" />
    },
]);