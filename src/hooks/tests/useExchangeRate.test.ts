import loadCurrencyExchRate from "../../services/api/loadCurrencyExchRate";
import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { createElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useExchangeRate from "../useExchangeRate";

vi.mock("../../services/api/loadCurrencyExchRate", () => ({
    default: vi.fn(),
}));

const mockExchangeRateData = {
    rates: {
        PLN: 3.8,
    },
};

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) =>
        createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useExchangeRate hook', () => {
    test('should return the current exchange rate for the target currency', async () => {
        vi.mocked(loadCurrencyExchRate).mockResolvedValue(mockExchangeRateData);
        
        const { result } = renderHook(() => useExchangeRate('PLN'), { wrapper: createWrapper() });
        expect(loadCurrencyExchRate).toHaveBeenCalledWith('USD');

        await waitFor(() => {
            expect(result.current.exchangeRateError).toBeNull();
            expect(result.current.currentExchangeRate).toBe(3.8);
        });
    });
    test('should handle errors when fetching the exchange rate', async () => {
        vi.mocked(loadCurrencyExchRate).mockRejectedValue(new Error("API error"));
        
        const { result } = renderHook(() => useExchangeRate('PLN'), { wrapper: createWrapper() });
        expect(loadCurrencyExchRate).toHaveBeenCalledWith('USD');

        await waitFor(() => {
            expect(result.current.exchangeRateError).toBe("Unable to fetch currency exchange rate");
            expect(result.current.currentExchangeRate).toBe(1);
        });
    });
});
