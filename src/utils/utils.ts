import { redirect } from "react-router-dom";
import { assets, type Asset } from "../constants/assets";
import type { CoinMarketData } from "../types/AssetTableTypes";
import type { WalletAsset } from "../types/WalletTypes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/config";

export const formatPercent = (value: number | null | undefined) => {
    if (value == null) {
        return "-";
    }

    return `${value.toFixed(1)}%`;
};

export const summaryTransformation = (assets: WalletAsset[]): WalletAsset[] => {
    const summary = Object.values(
        assets.reduce<Record<string, WalletAsset>>((acc, asset) => {
            if (!acc[asset.name]) {
                acc[asset.name] = { ...asset };
            } else {
                acc[asset.name].amount += asset.amount;
            }
            return acc;
        }, {}));
    return summary;
};

export const findAssetPrice = (assetList: Asset[], coingeckoData: CoinMarketData[], currentAsset: WalletAsset | string) => {

    if (typeof currentAsset === "string") {
        const assetData = (coingeckoData.find(d => d.id === assetList.find(a => a.name === currentAsset)?.coingeckoId)?.current_price || 0);
        return assetData;
    } else {
        const assetData = (coingeckoData.find(d => d.id === assetList.find(a => a.name === currentAsset.name)?.coingeckoId)?.current_price || 0);
        return assetData;
    }
}

export const countTotalValue = (assets: WalletAsset[], assetList: Asset[], coingeckoData: CoinMarketData[]) => {
    return assets.reduce((total, asset) => {
        const price = findAssetPrice(assetList, coingeckoData, asset);
        return total + (asset.amount * price);
    }, 0);
}

export function getCurrentUser(): Promise<string | null> {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user?.email ?? null);
        });
    });
}

export const checkAuth = (loggedUser: string | undefined | null) => {
    if (!loggedUser) {
        throw redirect("/login");
    }
}

export const calculateAvaragePrice = (data: WalletAsset[], platform: string) => {
    if (platform === "Summary") {
        const averangePricesObject = data.reduce<Record<string, number>>((acc, asset) => {
            const totalPrice = data.filter(a => a.name === asset.name).reduce((acc, a) => acc + (a.amount * a.averagePrice), 0);
            const totalAmount = data.filter(a => a.name === asset.name).reduce((acc, a) => acc + a.amount, 0);
            acc[asset.name] = totalAmount > 0 ? totalPrice / totalAmount : 0;
            return acc;
        }, {});
        return averangePricesObject;
    }
    else {
        const dataForPlatform = data.filter(asset => asset.market === platform);
        const averangePricesObject = dataForPlatform.reduce<Record<string, number>>((acc, asset) => {
            const totalPrice = dataForPlatform.filter(a => a.name === asset.name).reduce((acc, a) => acc + (a.amount * a.averagePrice), 0);
            const totalAmount = dataForPlatform.filter(a => a.name === asset.name).reduce((acc, a) => acc + a.amount, 0);
            acc[asset.name] = totalAmount > 0 ? totalPrice / totalAmount : 0;
            return acc;
        }, {});

        return averangePricesObject
    }
};

export const displayEarnOrLoss = (averangePriceObject: Record<string, number>, priceObject: CoinMarketData[]) => {

    const assetNames = Object.keys(averangePriceObject);
    const earnOrLossObject: Record<string, string> = {};
    assetNames.forEach(assetName => {
        const calculatedAveragePrice = averangePriceObject[assetName] || 0;
        const currentPrice = findAssetPrice(assets, priceObject, assetName) || 0;
        const earnOrLoss = ((currentPrice - calculatedAveragePrice) / calculatedAveragePrice) * 100;
        earnOrLossObject[assetName] = earnOrLoss > 0 ? `+${earnOrLoss.toFixed(2)}%` : `${earnOrLoss.toFixed(2)}%`;
    });
    return earnOrLossObject;
}






