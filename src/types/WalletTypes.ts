import type { CoinMarketData } from "./AssetTableTypes";

export interface WalletAssetEditRequest {
    name: string;
    amount: number;
    market: string;
    averagePrice: number;
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
    market: string;
    loggedUser: string;
    averagePrice: number;
}

export interface WalletTab {
    id: string;
    platformName: string;
    loggedUser: string;
}

export interface SummaryAssets {
    id: string;
    name: string;
    amount: number;
}

export type EditDataStatus = "edit" | "add" | "delete";

export interface EarnOrLossObject {
    [assetName: string]: {
        earnOrLossPercentage: string;
        averangePrice: number;
        currentPrice: number;
    };
}

export interface AssetsInvestmentValues {
    [assetName: string]: {
        earnOrLossPercentage: string;
        averangePrice: number;
        currentPrice: number;
        amount: number;
        earnedMoneyInUSD: number;
    };
}

export interface DepositData {
    amount: number;
    date: string;
    platform: string;
    loggedUser: string;
}