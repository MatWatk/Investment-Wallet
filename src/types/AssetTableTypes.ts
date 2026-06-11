export interface CoinMarketData {
    id: string;
    current_price: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_30d_in_currency: number;
    someFilteringTabsData: string;
}

export type AssetTypes = "All" | "Cryptocurrencies" | "Precious Metals" | "Stocks";

export interface AssetPriceTab {
    name: AssetTypes;
}
