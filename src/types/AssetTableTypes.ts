export interface CoinMarketData {
    id: string;
    current_price: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_30d_in_currency: number;
}

export type WalletTabs = "Summary" | "Binance" | "Kanga" | "ByBit" | "Physical";
export type AssetPriceListTabs = "All" | "Cryptocurrencies" | "Precious Metals" | "Stocks";

export type TabsObject<T> = readonly Record<"name", T>[];
