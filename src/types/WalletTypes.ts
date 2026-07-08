import type { CoinMarketData } from "./AssetTableTypes";

export interface WalletAssetEditRequest {
    name: string;
    amount: number;
    market: string;
    price: number;
    currency: "USD" | "PLN";
    date: string;
    editStatus?: EditDataStatus;
    assetId?: string;
    prevAmount?: number;
    defaultData?: WalletAssetEditRequest;
    actionRequestType?: "asset" | "platform";
    loggedUser: string;
}

export interface WalletPlatformEditRequest {
    platformId?: string;
    platformName: string;
    editStatus?: EditDataStatus;
    actionRequestType?: "asset" | "platform";
    loggedUser: string;
}

export interface WalletLoaderData {
    coingeckoData: CoinMarketData[];
    assetsFirestore: WalletAsset[];
    walletTabs: WalletTab[];
}

export interface WalletAsset {
    id: string;
    name: string;
    amount: number;
    market: MarketsType;
}

export type MarketsType = "Summary" | "Binance" | "Kanga" | "ByBit" | "Physical";

export interface WalletTab {
    id: string;
    platformName: MarketsType;
}

export interface SummaryAssets {
    id: string;
    name: string;
    amount: number;
}

export type EditDataStatus = "edit" | "add" | "delete";