import { useState } from 'react';
import type { MarketsType } from '../types/WalletTypes';

export default function useTabSwitch<T extends {name: string}, D extends { market: MarketsType } | { someFilteringTabsData: string }>(initialState: T["name"], visibleAssets: D[]) {
    const [activeTab, setActiveTab] = useState(initialState);
    const [actualVisibleAssets, setActualVisibleAssets] = useState(visibleAssets);

    const handleTabSwitch = (clickedTab: T["name"]) => {
        setActiveTab(clickedTab);
        if (clickedTab === "Summary") {
            setActualVisibleAssets(visibleAssets);
        } else {
            const filteredAssets = visibleAssets.filter(asset => {
                if ("market" in asset) {
                    return asset.market === clickedTab;
                } else if ("someFilteringTabsData" in asset) {
                    return asset.someFilteringTabsData === clickedTab;
                }
                return false;
            });
            setActualVisibleAssets(filteredAssets);
        }
    }


    return { activeTab, setActiveTab, handleTabSwitch, actualVisibleAssets };
}