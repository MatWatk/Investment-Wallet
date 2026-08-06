import { Provider } from "react-redux";
import WalletPage from "../WalletPage";
import { store } from "../../../store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { loader } from "../loader";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Layout from "../../../components/DashboardLayout";
import RouterError from "../../../router/RouteError";
import * as useSortDataModule from "../../../hooks/useSortData";

import { auth } from "../../../services/firebase/config";
import userEvent from "@testing-library/user-event";

vi.mock('../loader', () => ({
    loader: vi.fn(),
}));

const coingeckoDataMock = [{
    id: "bitcoin",
    name: "Bitcoin",
    current_price: 50000,
    price_change_percentage_24h_in_currency: 5.12,
    price_change_percentage_30d_in_currency: 10.38,
},
{
    id: "ethereum",
    name: "Ethereum",
    current_price: 3000,
    price_change_percentage_24h_in_currency: 3.45,
    price_change_percentage_30d_in_currency: 8.12,
}];

const mockAssetsFirestore = [
    {
        id: "1",
        name: "Bitcoin",
        amount: 0.5,
        market: "Coinbase",
        loggedUser: "user@example.com",
        averagePrice: 48000,
    },
    {
        id: "2",
        name: "Ethereum",
        amount: 2,
        market: "Binance",
        loggedUser: "user@example.com",
        averagePrice: 2500,
    },
    {
        id: "3",
        name: "Gold",
        amount: 3,
        market: "Binance",
        loggedUser: "anotherUser@example.com",
        averagePrice: 100,
    },
    {
        id: "4",
        name: "Bitcoin",
        amount: 1,
        market: "Coinbase",
        loggedUser: "anotherUser@example.com",
        averagePrice: 100,
    },
];

const walletTabsMock = [
    {
        id: "1",
        platformName: "Coinbase",
        loggedUser: "user@example.com",
    },
    {
        id: "2",
        platformName: "Binance",
        loggedUser: "user@example.com",
    },
    {
        id: "3",
        platformName: "Kraken",
        loggedUser: "anotherUser@example.com",
    },
];

describe('WalletPage tests', () => {
    afterEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(auth, 'currentUser', {
            value: null,
            configurable: true,
        });
    });

    const renderWalletPage = () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <Provider store={store}>
                        <Layout />
                    </Provider>
                ),
                children: [
                    {
                        index: true,
                        loader: loader,
                        element: <WalletPage />,
                        errorElement: <RouterError type="walletData" />,
                    },
                ],
            },
            {
                path: '/login',
                element: <div>Login Page</div>,
            },
        ], {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);
    };

    test('should render the WalletPage correctly', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: { email: "user@example.com" },
            configurable: true,
        });

        vi.mocked(loader).mockResolvedValue({
            coingeckoData: coingeckoDataMock,
            assetsFirestore: mockAssetsFirestore,
            walletTabs: walletTabsMock,
        });

        renderWalletPage();

        const walletHeader = await screen.findByText(/Your Wallet/i);
        const addAssetButton = await screen.findByRole('button', { name: /Add Asset/i });
        const addPlatformButton = await screen.findByRole('button', { name: /Add Platform/i });
        const searchInput = await screen.findByRole('textbox', { name: /Search/i });
        const walletSummary = await screen.findByText(/Your percentage return/i);
        const summarPlatform = await screen.findByText(/Summary/i);
        const editButton = screen.queryByRole('button', { name: /Edit/i });
        const loggedUserPlatform = await screen.findByText(walletTabsMock[0].platformName);
        const anotherUserPlatform = screen.queryByText(walletTabsMock[2].platformName);
        const anotherUserAsset = screen.queryByText(mockAssetsFirestore[2].name);

        const bitcoinName = await screen.findByText(/bitcoin/i);
        const bitcoinAmount = await screen.findByText(/^0.5/);

        expect(vi.mocked(loader)).toHaveBeenCalled();

        expect(walletHeader).toBeInTheDocument();
        expect(addAssetButton).toBeInTheDocument();
        expect(addPlatformButton).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(walletSummary).toBeInTheDocument();
        expect(summarPlatform).toBeInTheDocument();
        expect(editButton).not.toBeInTheDocument();
        expect(loggedUserPlatform).toBeInTheDocument();
        expect(anotherUserPlatform).not.toBeInTheDocument();
        expect(anotherUserAsset).not.toBeInTheDocument();

        expect(bitcoinName).toBeInTheDocument();
        expect(bitcoinAmount).toBeInTheDocument();

    });

    test('should display error message when loader throws error', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: { email: "user@example.com" },
            configurable: true,
        });
        vi.mocked(loader).mockRejectedValue(new Error('Error loading wallet data'));
        renderWalletPage();
        const errorMessage = await screen.findByText(/Error loading wallet data/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('should redirect to login page when user is not authenticated', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: null,
            configurable: true,
        });
        renderWalletPage();
        const loginPage = await screen.findByText(/Login Page/i);
        expect(loginPage).toBeInTheDocument();
    });

    test('should filter values when using search bar', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: { email: "user@example.com" },
            configurable: true,
        });

        vi.mocked(loader).mockResolvedValue({
            coingeckoData: coingeckoDataMock,
            assetsFirestore: mockAssetsFirestore,
            walletTabs: walletTabsMock,
        });

        renderWalletPage();

        const searchInput = await screen.findByRole('textbox', { name: /Search/i });
        const bitcoinRow = screen.queryByText(/Bitcoin/i);
        const ethereumRow = screen.queryByText(/Ethereum/i);

        await userEvent.type(searchInput, 'bitcoin');
        expect(ethereumRow).not.toBeInTheDocument();

        expect(bitcoinRow).toBeInTheDocument();

    });

    test('should render empty table when no assets are returned', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: { email: "user@example.com" },
            configurable: true,
        });

        vi.mocked(loader).mockResolvedValue({
            coingeckoData: coingeckoDataMock,
            assetsFirestore: [],
            walletTabs: walletTabsMock,
        });
        renderWalletPage();
        const walletHeader = await screen.findByText(/Your Wallet/i);
        const summaryPlatform = await screen.findByText(/Summary/i);
        const coinbasePlatform = await screen.findByText(/Coinbase/i);

        expect(walletHeader).toBeInTheDocument();
        expect(summaryPlatform).toBeInTheDocument();
        expect(coinbasePlatform).toBeInTheDocument();
    });

    test('should filter assets based on clicked platform', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: { email: "user@example.com" },
            configurable: true,
        });
        vi.mocked(loader).mockResolvedValue({
            coingeckoData: coingeckoDataMock,
            assetsFirestore: mockAssetsFirestore,
            walletTabs: walletTabsMock,
        });
        renderWalletPage();

        const coinbasePlatform = await screen.findByText(/Coinbase/i);
        const coinbaseAsset = await screen.findByText(mockAssetsFirestore[0].name);

        await userEvent.click(coinbasePlatform);

        expect(coinbaseAsset).toBeInTheDocument();
    });

    test('should call requestSort feature when clicking on sort button', async () => {
        const requestSortMock = vi.fn();
        vi.spyOn(useSortDataModule, 'default').mockReturnValue({
            sortedData: mockAssetsFirestore,
            requestSort: requestSortMock,
            sortConfig: { key: "name", direction: "ascending" },
        });

        Object.defineProperty(auth, 'currentUser', {
            value: {
                email: "user@example.com",
                configurable: true,
            },
        });
        vi.mocked(loader).mockResolvedValue({
            coingeckoData: coingeckoDataMock,
            assetsFirestore: mockAssetsFirestore,
            walletTabs: walletTabsMock,
        });

        renderWalletPage();

        const sortButtons = await screen.findAllByRole('button', { name: /Sorting arrows/i });
        
        await userEvent.click(sortButtons[0]);

        expect(requestSortMock).toHaveBeenCalledWith("name");

    });
});