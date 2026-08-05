import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { auth } from "../../../services/firebase/config";
import RouterError from "../../../router/RouteError";
import { loader } from "../loader";
import { render, screen } from "@testing-library/react";
import AssetsPricePage from "../AssetsPricePage";
import type { CoinMarketData } from "../../../types/AssetTableTypes";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { afterEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Layout from "../../../components/DashboardLayout";

vi.mock('../loader', () => ({
    loader: vi.fn(),
}));

Object.defineProperty(auth, 'currentUser', {
    value: { email: 'user@example.com' },
    writable: true,
});

const mockData: CoinMarketData[] = [{
    id: "bitcoin",
    name: "Bitcoin",
    current_price: 50000,
    price_change_percentage_24h_in_currency: 5.12,
    price_change_percentage_30d_in_currency: 10.38,
    someFilteringTabsData: "All",
},
{
    id: "ethereum",
    name: "Ethereum",
    current_price: 3000,
    price_change_percentage_24h_in_currency: 3.45,
    price_change_percentage_30d_in_currency: 8.12,
    someFilteringTabsData: "All",
}]


describe('AssetPricePage tests', () => {
    const renderAssetPricePage = () => {
        const router = createMemoryRouter([
            {
                path: '/asset-price',
                element: <Provider store={store}>
                    <Layout />
                </Provider>,
                children: [
                    {
                        index: true,
                        loader: loader,
                        element: (
                            <Provider store={store}>
                                <AssetsPricePage />
                            </Provider>
                        ),
                        errorElement: <RouterError type="assetPriceData" />,
                    }
                ],
            },
            {
                path: '/login',
                element: <div>Login Page</div>
            },
        ],
            {
                initialEntries: ['/asset-price'],
            }
        );
        render(<RouterProvider router={router} />);
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('should load Asset Price Page correctly with data', async () => {
        vi.mocked(loader).mockResolvedValue(mockData);
        renderAssetPricePage();

        const assetPriceHeader = await screen.findByText(/Asset Price List/i);

        const bitcoinRow = await screen.findByText(/Bitcoin/i);
        const searchInput = await screen.findByRole('textbox', { name: /Search/i });
        const price24hChange = await screen.findByText(/5.1%/i);
        const price30dChange = await screen.findByText(/10.4%/i);

        const ethereumRow = screen.queryByText(/Ethereum/i);
        const ethereumPrice24hChange = screen.queryByText(/3.5%/i);
        const ethereumPrice30dChange = screen.queryByText(/8.1%/i);
        const ethereumPrice = screen.queryByText(/3000/i);


        expect(vi.mocked(loader)).toHaveBeenCalled();

        expect(assetPriceHeader).toBeInTheDocument();
        expect(bitcoinRow).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(price24hChange).toBeInTheDocument();
        expect(price30dChange).toBeInTheDocument();

        expect(ethereumRow).toBeInTheDocument();
        expect(ethereumPrice24hChange).toBeInTheDocument();
        expect(ethereumPrice30dChange).toBeInTheDocument();
        expect(ethereumPrice).toBeInTheDocument();
    });

    test('should filter assets based on search input', async () => {
        vi.mocked(loader).mockResolvedValue(mockData);
        renderAssetPricePage();

        const searchInput = await screen.findByRole('textbox', { name: /Search/i });
        const bitcoinRow = await screen.findByText(/Bitcoin/i);
        const ethereumRow = await screen.findByText(/Ethereum/i);

        expect(bitcoinRow).toBeInTheDocument();
        expect(ethereumRow).toBeInTheDocument();

        await userEvent.type(searchInput, 'bitcoin');
        expect(screen.queryByText(/Ethereum/i)).not.toBeInTheDocument();

        expect(screen.queryByText(/Bitcoin/i)).toBeInTheDocument();
    });

    test('should display error message when loader throws error', async () => {
        vi.mocked(loader).mockRejectedValue(new Error('Error loading asset price data'));
        renderAssetPricePage();

        expect(await screen.findByText(/Error loading asset price data/i)).toBeInTheDocument();
    });

    test('should render empty table when no assets are returned', async () => {
        vi.mocked(loader).mockResolvedValue([]);
        renderAssetPricePage();

        const assetPriceHeader = await screen.findByText(/Asset Price List/i);
        expect(assetPriceHeader).toBeInTheDocument();
    });
});