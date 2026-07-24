import { useEffect, useState } from "react";
import loadCurrencyExchRate from "../services/api/loadCurrencyExchRate";

export default function useExchangeRate(baseCurrency: string, targetCurrency: string) {
    const [currentExchangeRate, setCurrentExchangeRate] = useState(1);
    const [exchangeRateError, setExchangeRateError] = useState<string | null>(null);

    useEffect(() => {
        let canceled = false;

        const loadRate = async () => {
            try {
                const exchangeRateData = await loadCurrencyExchRate(baseCurrency);
                if (!canceled) {
                    const nextRate = exchangeRateData?.rates?.[targetCurrency];
                    setCurrentExchangeRate(typeof nextRate === "number" ? nextRate : 1);
                    setExchangeRateError(null);
                }
            } catch (error) {
                console.error("Failed to load currency exchange rate:", error);
                if (!canceled) {
                    setExchangeRateError("Unable to fetch currency exchange rate");
                }
            }
        };

        loadRate();

        return () => {
            canceled = true;
        };
    }, [baseCurrency, targetCurrency]);

    return { currentExchangeRate, exchangeRateError };
}
