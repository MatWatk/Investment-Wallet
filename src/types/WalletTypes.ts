import type { CoinMarketData } from "./AssetTableTypes";

export interface WalletLoaderData {
    coingeckoData: CoinMarketData[];
    assetsFirestore: WalletAsset[];
    walletTabs: WalletTab[];
}

export interface WalletAsset {
    name: string;
    amount: number;
    market: MarketsType;
}

export type MarketsType = "Summary" | "Binance" | "Kanga" | "ByBit" | "Physical";

export interface WalletTab {
    name: MarketsType;
}

export interface SummaryAssets {
    name: string;
    amount: number;
}