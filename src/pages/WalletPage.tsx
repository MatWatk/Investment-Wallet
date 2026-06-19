import AssetTableHeader from "../components/AssetTable/AssetTableHeader";
import AssetPositionName from "../components/AssetTable/AssetPositionName";
import SearchInput from "../components/AssetTable/SearchInput";
import PageHeader from "../components/PageHeader";
import PageContentWrapper from "../components/PageContentWrapper";
import TabsBar from "../components/TabsBar";

import { assets } from "../constants/assets";

import tableStyles from "../styles/tableStyles";

import useSortData from "../hooks/useSortData";
import useFilter from "../hooks/useFilter";
import useRevalidatePage from "../hooks/useRevalidatePage";

import { marketTabs } from "../constants/tabs";
import type { MarketsType, WalletTab } from "../types/WalletTypes";
import useTabSwitch from "../hooks/useTabSwitch";

import type { WalletAsset } from "../types/WalletTypes";
import { summaryTransformation, findAssetPrice, countTotalValue } from "../utils/utils";
import { useSelector } from "react-redux";
import type { currencyType } from "../types/types";
import { store } from "../store";
import loadAssetPrices from "../services/api/loadAssetPrices";
import { useLoaderData } from "react-router-dom";
import type { WalletLoaderData } from "../types/WalletTypes";
import { translations } from "../constants/translations";
import SummaryBar from "../components/Wallet_components/SummaryBar";
import AssetAddButton from "../components/Wallet_components/WalletForm";
import { useState } from "react";
import AddAssetModal from "../components/Modals/AddAssetModal";
import AddPlatformModal from "../components/Modals/AddPlatformModal";


import loadFirebaseData from "../services/api/loadFirebaseData";

export default function WalletPage() {
    const currency = useSelector((state: { currency: { currency: currencyType } }) => state.currency.currency);
    const language = useSelector((state: { language: { language: keyof typeof translations } }) => state.language.language);
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    useRevalidatePage(currency);

    const { coingeckoData, assetsFirestore } = useLoaderData<WalletLoaderData>();

    const { sortedData, requestSort, sortConfig } = useSortData(assetsFirestore, {
        name: (asset) => asset.name,
        amount: (asset) => asset.amount,
        value: (asset) => findAssetPrice(assets, coingeckoData, asset) * asset.amount,
    });

    const { visibleAssets, handleSearch } = useFilter({ sortedData });
    const { activeTab, handleTabSwitch, actualVisibleAssets } = useTabSwitch<MarketsType, WalletAsset>("Summary", visibleAssets, asset => asset.market, summaryTransformation);


    const totalValue = countTotalValue(actualVisibleAssets, assets, coingeckoData);

    const [showAssetModal, setShowAssetModal] = useState(false);
    const [showPlatformModal, setShowPlatformModal] = useState(false);

    const handleAddAssetClick = () => {
        setShowAssetModal(true);
    }


    return (
        <>
            <div className="mb-6 flex flex-row items-center gap-4">
                <PageHeader title={translations[language].walletPage.walletHeader} />
                <div className="flex flex-row gap-5 ml-auto">
                    <AssetAddButton onClick={handleAddAssetClick}>{translations[language].walletPage.addAssetButton}</AssetAddButton>
                    <AssetAddButton onClick={() => setShowPlatformModal(true)}>{translations[language].walletPage.addPlatform}</AssetAddButton>
                </div>
            </div>
            <PageContentWrapper>
                {showAssetModal && <AddAssetModal isOpen={showAssetModal} onClose={() => setShowAssetModal(false)} openPlatformModal={() => setShowPlatformModal(true)} />}
                {showPlatformModal && <AddPlatformModal isOpen={showPlatformModal} onClose={() => setShowPlatformModal(false)} />}
                <SearchInput
                    handleSearch={handleSearch}
                    label={translations[language].walletPage.searchbarLabel}
                    placeholder={translations[language].walletPage.searchbarPlaceholder}
                />
                <TabsBar<WalletTab> tabs={marketTabs} activeTab={activeTab} handleTabSwitch={handleTabSwitch} />
                <AssetTableHeader
                    name
                    amount
                    value
                    currency
                    handleSort={requestSort}
                    sortConfig={sortConfig}
                    sortableKeys={["name", "amount", "value"]}
                />
                {actualVisibleAssets.map((walletAsset) => {
                    const assetPrice = findAssetPrice(assets, coingeckoData, walletAsset);
                    const countedPrice = assetPrice * walletAsset.amount;
                    return (
                        <>
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
                        </>
                    )
                })}
                <SummaryBar totalValue={totalValue} />
            </PageContentWrapper>
        </>
    );
}

export async function loader() {
    const currency = store.getState().currency.currency;
    const [coingeckoData, assetsFirestore] = await Promise.all([
        loadAssetPrices<{ coingeckoId: string }[]>({ assets, currency }),
        loadFirebaseData("wallet-assets"),
    ]);

    return { coingeckoData, assetsFirestore };
}