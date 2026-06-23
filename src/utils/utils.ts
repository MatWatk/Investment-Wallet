import type { Asset } from "../constants/assets";
import type { CoinMarketData } from "../types/AssetTableTypes";
import type { WalletAsset } from "../types/WalletTypes";

    export const formatPercent = (value: number | null | undefined) => {
        if (value == null) {
            return "-";
        }

        return `${value.toFixed(1)}%`;
    };

    export const summaryTransformation = (assets: WalletAsset[]) : WalletAsset[] => {
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

    export const findAssetPrice = (assetList: Asset[], coingeckoData: CoinMarketData[], currentAsset: WalletAsset) => {
        const assetData = (coingeckoData.find(d => d.id === assetList.find(a => a.name === currentAsset.name)?.coingeckoId)?.current_price || 0);
        return assetData;
    }

    export const countTotalValue = (assets: WalletAsset[], assetList: Asset[], coingeckoData: CoinMarketData[]) => {
        return assets.reduce((total, asset) => {
            const price = findAssetPrice(assetList, coingeckoData, asset);
            return total + (asset.amount * price);
        }, 0);
    }
