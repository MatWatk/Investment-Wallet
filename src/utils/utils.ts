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