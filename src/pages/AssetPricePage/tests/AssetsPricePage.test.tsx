import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import * as useSortDataModule from "../../../hooks/useSortData";
import loadAssetPrices from "../../../services/api/loadAssetPrices";
import { assets } from "../../../constants/assets";

vi.mock("../../../services/api/loadAssetPrices");

Object.defineProperty(auth, 'currentUser', {
    value: { email: 'user@example.com' },
    configurable: true,
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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    }
})


describe('AssetPricePage tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.removeQueries({ queryKey: ["assetPrices", { assets, currency: "USD" }] });
    });
    const renderAssetPricePage = () => {
        const router = createMemoryRouter([
            {
                path: '/asset-price',
                element:
                    <QueryClientProvider client={queryClient}>
                        <Provider store={store}>
                            <Layout />
                        </Provider>
                    </QueryClientProvider>,
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
        Object.defineProperty(auth, 'currentUser', {
            value: {
                email: 'user@example.com',
                configurable: true,
            }
        });
    });

    test('should load Asset Price Page correctly with data', async () => {
        queryClient.setQueryData(["assetPrices", { assets, currency: "USD" }], mockData);
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
        queryClient.setQueryData(["assetPrices", { assets, currency: "USD" }], mockData);
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
        vi.mocked(loadAssetPrices).mockRejectedValueOnce(new Error('Error loading asset price data'));
        renderAssetPricePage();

        expect(await screen.findByText(/Error loading asset price data/i)).toBeInTheDocument();
    });

    test('should render empty table when no assets are returned', async () => {
        queryClient.setQueryData(["assetPrices", { assets, currency: "USD" }], []);
        renderAssetPricePage();

        const assetPriceHeader = await screen.findByText(/Asset Price List/i);
        expect(assetPriceHeader).toBeInTheDocument();
    });

    test('should redirect to login page when user is not authenticated', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: null,
            configurable: true,
        });
        renderAssetPricePage();
        const loginPage = await screen.findByText(/Login Page/i);
        expect(loginPage).toBeInTheDocument();
    });

    test('should sort assets when clicking on sorting arrow buttons', async () => {
        queryClient.setQueryData(["assetPrices", { assets, currency: "USD" }], mockData);
        const requestSortMock = vi.fn();
        vi.spyOn(useSortDataModule, 'default').mockReturnValue({
            sortedData: mockData,
            requestSort: requestSortMock,
            sortConfig: { key: 'name', direction: 'ascending' },
        });

        renderAssetPricePage();

        const nameSortButton = await screen.findAllByRole('button', { name: /Sorting arrows/i });

        await userEvent.click(nameSortButton[0]);

        expect(requestSortMock).toHaveBeenCalledWith('name');
    });
});