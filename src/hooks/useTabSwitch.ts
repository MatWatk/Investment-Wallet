import { useMemo, useState } from 'react';
import type { MarketsType } from '../types/WalletTypes';

export default function useTabSwitch<T extends {name: string}, D extends { market: MarketsType } | { someFilteringTabsData: string }>(initialState: T["name"], visibleAssets: D[]) {
    const [activeTab, setActiveTab] = useState(initialState);

    const handleTabSwitch = (clickedTab: T["name"]) => {
        setActiveTab(clickedTab);
    }

    const actualVisibleAssets = useMemo(() => {
        if (activeTab === "Summary") {
            return visibleAssets;
        }

        return visibleAssets.filter(asset => {
            if ("market" in asset) {
                return asset.market === activeTab;
            } else if ("someFilteringTabsData" in asset) {
                return asset.someFilteringTabsData === activeTab;
            }
            return false;
        });
    }, [activeTab, visibleAssets]);


    return { activeTab, setActiveTab, handleTabSwitch, actualVisibleAssets };
}