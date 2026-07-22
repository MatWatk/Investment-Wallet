import type { EditDataStatus, WalletAsset, WalletAssetEditRequest, WalletPlatformEditRequest, WalletTab } from "../types/WalletTypes";

export const createWalletAssetEditRequest =
    (
        actualVisibleAssets: WalletAsset[],
        currency: "USD" | "PLN",
        assetId: string,
        editStatus: EditDataStatus,
        loggedUser: string,
        averagePriceObject: Record<string, number>,
    ): WalletAssetEditRequest => {
        const asset = actualVisibleAssets.find(asset => asset.id === assetId);
        if (!asset) {
            throw new Error(`Asset ${assetId} not found`);
        }
        const averangePrice = averagePriceObject[asset.name] || 0;

        return ({
            assetId,
            name: asset.name,
            amount: asset.amount,
            market: asset.market,
            averagePrice: averangePrice,
            currency: currency,
            date: new Date().toISOString().split("T")[0],
            editStatus: editStatus,
            actionRequestType: "asset",
            loggedUser: loggedUser,
        });
    }

export const createPlatformEditRequest = (
    platformId: string,
    allPlatforms: WalletTab[],
    editStatus: EditDataStatus,
    loggedUser: string
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
        loggedUser: loggedUser,
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