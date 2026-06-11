import { useMemo, useState } from 'react';
import type { MarketsType, SummaryAssets } from '../types/WalletTypes';

export default function useTabSwitch<T, D extends { market: MarketsType } | { someFilteringTabsData: string }>
    (
        initialState: T,
        visibleAssets: D[],
        getTabValue: (asset: D) => string,
        summaryTransformation?: (assets: D[]) => SummaryAssets[]
    ) {
    const [activeTab, setActiveTab] = useState(initialState);

    const handleTabSwitch = (clickedTab: T) => {
        setActiveTab(clickedTab);
    }

    const actualVisibleAssets = useMemo(() => {
        if (activeTab === "Summary") {
            return summaryTransformation ? summaryTransformation(visibleAssets) : visibleAssets;
        }

        return visibleAssets.filter(asset => getTabValue(asset) === activeTab);
    }, [activeTab, visibleAssets]);


    return { activeTab, setActiveTab, handleTabSwitch, actualVisibleAssets };
}