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
import useRevalidatePage from "../hooks/useRevalidatePage";

import { marketTabs } from "../constants/tabs";
import type { MarketsType, WalletTab } from "../types/WalletTypes";
import useTabSwitch from "../hooks/useTabSwitch";

import type { WalletAsset } from "../types/WalletTypes";
import { summaryTransformation } from "../utils/utils";
import { useSelector } from "react-redux";
import type { currencyType } from "../types/types";
import { store } from "../store";
import loadAssetPrices from "../services/api/loadAssetPrices";
import { useLoaderData } from "react-router-dom";
import type { CoinMarketData } from "../types/AssetTableTypes";

export default function WalletPage() {
    const currency = useSelector((state: { currency: { currency: currencyType } }) => state.currency.currency);
    useRevalidatePage({ dependency: currency });

    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    const data = useLoaderData<CoinMarketData[]>();
    console.log(data);

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
                {actualVisibleAssets.map((walletAsset) => {
                    const assetPrice = data.find(asset => asset.id === assets.find(a => a.name === walletAsset.name)?.coingeckoId)?.current_price || 0;
                    const countedPrice = assetPrice * walletAsset.amount;
                    return (
                        <div key={`${walletAsset.name}-${walletAsset.amount}`} className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
                            {assets.find(a => a.name === walletAsset.name)?.image && (
                                <AssetPositionName name={walletAsset.name} image={assets.find(a => a.name === walletAsset.name)?.image || ""} />
                            )}
                            <div className="ml-auto flex flex-row gap-2 shrink-0 items-center whitespace-nowrap">
                                <p className="w-33 text-center flex items-center justify-center gap-2 shrink-0">{walletAsset.amount}</p>
                                <p className="w-25 text-center flex items-center justify-center gap-2 shrink-0">{countedPrice.toFixed(2)}</p>
                                <p className="w-22 text-right shrink-0">{currency}</p>
                            </div>
                        </div>
                    )
                })}
            </PageContentWrapper>
            <AssetAddSection />
        </>
    );
}

export function loader() {
    const currency = store.getState().currency.currency;
    return loadAssetPrices<{ coingeckoId: string }[]>({ assets, currency });
}