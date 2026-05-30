import { useEffect, useState } from "react";
import fetchData from "../services/api/fetchData";
import type { Asset } from "../constants/assets";

export function useFetchCryptoPrice(token: Asset, currency: string) {
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);

        useEffect(() => {
        const getCryptoPrice = async () => {
           const fetchOptions = { method: 'GET', headers: { 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY } }
            const res = await fetchData(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=${currency}&ids=${token.name.toLowerCase()}&names=${token.name.toLowerCase()}&symbols=${token.symbol.toLowerCase()}`, fetchOptions)
             setCurrentPrice(res[token.name.toLowerCase()][currency] ?? null);
        }
        getCryptoPrice();
        


    }, [token.name, token.symbol, currency]) 
    return currentPrice;
}