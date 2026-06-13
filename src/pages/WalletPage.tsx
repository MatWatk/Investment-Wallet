import AssetTableHeader from "../components/AssetTable/AssetTableHeader";
import AssetPositionName from "../components/AssetTable/AssetPositionName";
import SearchInput from "../components/AssetTable/SearchInput";
import AssetAddSection from "../components/Wallet_components/WalletForm";
import PageHeader from "../components/PageHeader";
import PageContentWrapper from "../components/PageContentWrapper";
import TabsBar from "../components/TabsBar";

import { walletDummyData } from "../constants/assets";
import { assets } from "../constants/assets";

import tableStyles from "../styles/tableStyles";

import useSortData from "../hooks/useSortData";
import useFilter from "../hooks/useFilter";

import { marketTabs } from "../constants/tabs";
import type { MarketsType, WalletTab } from "../types/WalletTypes";
import useTabSwitch from "../hooks/useTabSwitch";

import type { WalletAsset } from "../types/WalletTypes";
import { summaryTransformation } from "../utils/utils";
import { useSelector } from "react-redux";

export default function WalletPage() {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

    const { sortedData, requestSort, sortConfig } = useSortData(walletDummyData, {
        name: (asset) => asset.name,
        amount: (asset) => asset.amount,
    });

    const { visibleAssets, handleSearch } = useFilter({ sortedData });
    const { activeTab, handleTabSwitch, actualVisibleAssets } = useTabSwitch<MarketsType, WalletAsset>("Summary", visibleAssets, asset => asset.market, summaryTransformation);


    return (
        <>
            <PageHeader title="Your Wallet" />
            <PageContentWrapper>
                <SearchInput handleSearch={handleSearch} />
                <TabsBar<WalletTab> tabs={marketTabs} activeTab={activeTab} handleTabSwitch={handleTabSwitch} />
                <AssetTableHeader
                    name
                    amount
                    price
                    currency
                    handleSort={requestSort}
                    sortConfig={sortConfig}
                    sortableKeys={["name", "amount"]}
                />
                {actualVisibleAssets.map((walletAsset) => (
                    <div key={`${walletAsset.name}-${walletAsset.amount}`} className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
                        {assets.find(a => a.name === walletAsset.name)?.image && (
                            <AssetPositionName name={walletAsset.name} image={assets.find(a => a.name === walletAsset.name)?.image || ""} />
                        )}
                        <div className="ml-auto flex flex-row gap-2 shrink-0 items-center whitespace-nowrap">
                            <p className="w-25 text-center flex items-center justify-center gap-2 shrink-0">{walletAsset.amount}</p>
                            <p className="w-25 text-center flex items-center justify-center gap-2 shrink-0">Price</p>
                            <p className="w-25 text-right shrink-0">Currency</p>
                        </div>
                    </div>
                ))}
            </PageContentWrapper>
            <AssetAddSection />
        </>
    );
}