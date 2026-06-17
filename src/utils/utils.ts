import type { Asset } from "../constants/assets";
import type { CoinMarketData } from "../types/AssetTableTypes";
import type { SummaryAssets, WalletAsset } from "../types/WalletTypes";

    export const formatPercent = (value: number | null | undefined) => {
        if (value == null) {
            return "-";
        }

        return `${value.toFixed(1)}%`;
    };

    export const summaryTransformation = (assets: WalletAsset[]) : SummaryAssets[] => {
        const summary = Object.values(
            assets.reduce<Record<string, SummaryAssets>>((acc, asset) => {
            if (!acc[asset.name]) {
                acc[asset.name] = { name: asset.name, amount: asset.amount };
            } else {
                acc[asset.name].amount += asset.amount;
            }
            return acc;
        }, {}));
        return summary;
    };

    export const findAssetPrice = (assetList: Asset[], data: CoinMarketData[], currentAsset: WalletAsset | SummaryAssets) => {
        const assetData = (data.find(d => d.id === assetList.find(a => a.name === currentAsset.name)?.coingeckoId)?.current_price || 0);
        return assetData;
    }

    export const countTotalValue = (assets: WalletAsset[] | SummaryAssets[], assetList: Asset[], data: CoinMarketData[]) => {
        return assets.reduce((total, asset) => {
            const price = findAssetPrice(assetList, data, asset);
            return total + (asset.amount * price);
        }, 0);
    }