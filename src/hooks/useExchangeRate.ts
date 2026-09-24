import loadCurrencyExchRate from "../services/api/loadCurrencyExchRate";
import { useQuery } from "@tanstack/react-query";

export default function useExchangeRate(targetCurrency: string) {

    const { data, error } = useQuery({
        queryKey: ['exchangeRate', targetCurrency],
        queryFn: async () => await loadCurrencyExchRate("USD"),
        staleTime: 30 * 60 * 1000,
    });

    const currentExchangeRate = data?.rates[targetCurrency] ?? 1;
    const exchangeRateError = error ? "Unable to fetch currency exchange rate" : null;

    return { currentExchangeRate, exchangeRateError };
}
