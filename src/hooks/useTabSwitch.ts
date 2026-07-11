import { useMemo, useState } from 'react';

export default function useTabSwitch<T, D extends { market: string }>
    (
        initialState: T,
        visibleAssets: D[],
        getTabValue: (asset: D) => string,
        summaryTransformation?: (assets: D[]) => D[]
    ) {
    const [activeTab, setActiveTab] = useState(initialState);

    const handleTabSwitch = (clickedTab: T) => {
        setActiveTab(clickedTab);
    }

    const actualVisibleAssets = useMemo(() => {
        if (activeTab === "Summary" && summaryTransformation) {
            return summaryTransformation(visibleAssets);
        }

        return summaryTransformation ? summaryTransformation(visibleAssets.filter(asset => getTabValue(asset) === activeTab)) : visibleAssets.filter(asset => getTabValue(asset) === activeTab);
    }, [activeTab, visibleAssets, summaryTransformation]);


    return { activeTab, setActiveTab, handleTabSwitch, actualVisibleAssets };
}