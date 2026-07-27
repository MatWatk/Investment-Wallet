import { redirect } from "react-router-dom";
import { assets, type Asset } from "../constants/assets";
import type { CoinMarketData } from "../types/AssetTableTypes";
import type { AssetsInvestmentValues, EarnOrLossObject, WalletAsset } from "../types/WalletTypes";
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

export const getAssetsAmount = (assets: WalletAsset[], assetName: string) => {
    const totalAmount = assets.filter(a => a.name === assetName).reduce((acc, a) => acc + a.amount, 0);
    return totalAmount;
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
    const filteredData = platform === "Summary"
        ? data
        : data.filter(asset => asset.market === platform);

    const averagePricesObject = filteredData.reduce<Record<string, { totalAmount: number; totalPrice: number }>>((acc, asset) => {
        const existing = acc[asset.name] ?? { totalAmount: 0, totalPrice: 0 };
        const nextAmount = existing.totalAmount + asset.amount;
        const nextPrice = existing.totalPrice + (asset.amount * asset.averagePrice);

        acc[asset.name] = {
            totalAmount: nextAmount,
            totalPrice: nextPrice,
        };

        return acc;
    }, {});

    return Object.entries(averagePricesObject).reduce<Record<string, number>>((acc, [assetName, values]) => {
        if (values.totalAmount > 0) {
            acc[assetName] = values.totalPrice / values.totalAmount;
        }
        return acc;
    }, {});
};

export const displayEarnOrLoss = (averangePriceObject: Record<string, number>, priceObject: CoinMarketData[]): EarnOrLossObject => {
    const assetNames = Object.keys(averangePriceObject);
    const earnOrLossObject: EarnOrLossObject = {};
    assetNames.forEach(assetName => {
        const calculatedAveragePrice = averangePriceObject[assetName] || 0;
        const currentPrice = findAssetPrice(assets, priceObject, assetName) || 0;
        const earnOrLoss = calculatedAveragePrice > 0
            ? ((currentPrice - calculatedAveragePrice) / calculatedAveragePrice) * 100
            : 0;
        earnOrLossObject[assetName] = {
            earnOrLossPercentage: earnOrLoss > 0 ? `+${earnOrLoss.toFixed(2)}%` : `${earnOrLoss.toFixed(2)}%`,
            averangePrice: calculatedAveragePrice,
            currentPrice: currentPrice
        };
    });
    return earnOrLossObject;
}

export const prepareDataForStatistics = (dbAssetsFirestore: WalletAsset[], coingeckoData: CoinMarketData[], activeTab: string) => {
    const averangePricesObject = calculateAvaragePrice(dbAssetsFirestore, activeTab);
    const earnOrLossObject = displayEarnOrLoss(averangePricesObject, coingeckoData);
    const walletData = Object.keys(earnOrLossObject).reduce((acc, assetName): AssetsInvestmentValues => {
        const { earnOrLossPercentage, averangePrice, currentPrice } = earnOrLossObject[assetName];
        const earnedMoneyInUSD = (currentPrice - averangePrice) * getAssetsAmount(dbAssetsFirestore, assetName);
        acc[assetName] = {
            earnOrLossPercentage,
            averangePrice,
            currentPrice,
            amount: getAssetsAmount(dbAssetsFirestore, assetName),
            earnedMoneyInUSD
        };
        return acc;
    }, {});
    return walletData;
};

export const calculateTotalEarnOrLoss = (dbAssetsFirestore: WalletAsset[], coingeckoData: CoinMarketData[]) => {
    const walletData = prepareDataForStatistics(dbAssetsFirestore, coingeckoData, 'Summary');
    const totalEarnOrLoss = Object.values(walletData).reduce((acc, { earnedMoneyInUSD }) => acc + earnedMoneyInUSD, 0);
    const totalPercentage = Object.values(walletData).reduce((acc, { earnedMoneyInUSD, averangePrice, amount }) => {
        const totalInvested = averangePrice * amount;
        const percentage = totalInvested > 0 ? (earnedMoneyInUSD / totalInvested) * 100 : 0;
        return acc + percentage;
    }, 0);
    return {
        totalEarnOrLoss: totalEarnOrLoss.toFixed(2),
        totalPercentage: totalPercentage.toFixed(2)
    };
}






