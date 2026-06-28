import type { Asset } from "../constants/assets";
import type { CoinMarketData } from "../types/AssetTableTypes";
import type { EditDataStatus, WalletAsset, WalletAssetEditRequest, WalletPlatformEditRequest, WalletTab } from "../types/WalletTypes";
import { findAssetPrice } from "./utils";

export const createWalletAssetEditRequest =
    (
        actualVisibleAssets: WalletAsset[],
        assets: Asset[],
        coingeckoData: CoinMarketData[],
        currency: "USD" | "PLN",
        assetId: string,
        editStatus: EditDataStatus
    ): WalletAssetEditRequest => {
        const asset = actualVisibleAssets.find(asset => asset.id === assetId);
        if (!asset) {
            throw new Error(`Asset ${assetId} not found`);
        }
        return ({
            assetId,
            name: asset.name,
            amount: asset.amount,
            market: asset.market,
            price: findAssetPrice(assets, coingeckoData, asset ?? { id: "", name: "", amount: 0, market: "" }),
            currency: currency,
            date: new Date().toISOString().split("T")[0],
            editStatus: editStatus,
            actionRequestType: "asset",
        });
    }

export const createPlatformEditRequest = (
    platformId: string,
    allPlatforms: WalletTab[],
    editStatus: EditDataStatus
): WalletPlatformEditRequest => {
    const currentPlatform = allPlatforms.find(platform => platform.id === platformId);
    if (!currentPlatform) {
        throw new Error(`Platform ${platformId} not found`);
    }
    return {
        platformId: currentPlatform.id,
        platformName: currentPlatform.platformName,
        editStatus: editStatus,
        actionRequestType: "platform",
    };
}

export const convertDataForRequest = (reqData: WalletPlatformEditRequest | WalletAssetEditRequest) => {
    const formData = new FormData();
    Object.entries(reqData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
        }
    });
    return formData;
}