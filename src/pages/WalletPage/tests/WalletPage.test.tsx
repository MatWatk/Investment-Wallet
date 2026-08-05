import { Provider } from "react-redux";
import WalletPage from "../WalletPage";
import { store } from "../../../store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { loader } from "../loader";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { auth } from "../../../services/firebase/config";

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
                loader: loader,
                element: (<Provider store={store}>
                    <WalletPage />
                </Provider>),
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
});