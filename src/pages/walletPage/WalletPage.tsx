import AssetTableHeader from "../../components/AssetTable/AssetTableHeader";
import AssetPositionName from "../../components/AssetTable/AssetPositionName";
import SearchInput from "../../components/AssetTable/SearchInput";
import PageHeader from "../../components/PageHeader";
import PageContentWrapper from "../../components/PageContentWrapper";
import TabsBar from "../../components/Tabs_components/TabsBar";

import { assets } from "../../constants/assets";

import tableStyles from "../../styles/tableStyles";

import useSortData from "../../hooks/useSortData";
import useFilter from "../../hooks/useFilter";
import useRevalidatePage from "../../hooks/useRevalidatePage";

import type { MarketsType, WalletTab } from "../../types/WalletTypes";
import useTabSwitch from "../../hooks/useTabSwitch";

import type { WalletAsset } from "../../types/WalletTypes";
import { summaryTransformation, findAssetPrice, countTotalValue } from "../../utils/utils";
import { store } from "../../store";
import loadAssetPrices from "../../services/api/loadAssetPrices";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import type { WalletLoaderData } from "../../types/WalletTypes";
import { translations } from "../../constants/translations";
import SummaryBar from "../../components/Wallet_components/SummaryBar";
import AssetAddButton from "../../components/Wallet_components/WalletForm";
import { useEffect, useState } from "react";
import AddAssetModal from "../../components/Modals/AddAssetModal";
import AddPlatformModal from "../../components/Modals/AddPlatformModal";

import loadWalletAssets from "../../services/api/loadFirebaseData";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { useCurrency } from "../../hooks/useCurrency";
import addData from "../../services/api/addData";
import { parseWalletAssetRequest } from "../../utils/parsers";

export default function WalletPage() {
    const currency = useCurrency();
    const language = useLanguage();
    const themeState = useTheme();
    useRevalidatePage(currency);

    const { coingeckoData, assetsFirestore, walletTabs } = useLoaderData<WalletLoaderData>();
    useRevalidatePage(walletTabs);
    useRevalidatePage(assetsFirestore);

    const { sortedData, requestSort, sortConfig } = useSortData<WalletAsset, "name" | "amount" | "value">(assetsFirestore, {
        name: (asset) => asset.name,
        amount: (asset) => asset.amount,
        value: (asset) => findAssetPrice(assets, coingeckoData, asset) * asset.amount,
    }, { key: "name", direction: "ascending" });

    const { visibleAssets, handleSearch } = useFilter({ sortedData });
    const { activeTab, handleTabSwitch, actualVisibleAssets } = useTabSwitch<MarketsType, WalletAsset>("Summary", visibleAssets, asset => asset.market, summaryTransformation);


    const totalValue = countTotalValue(actualVisibleAssets, assets, coingeckoData);
    
    const [showAssetModal, setShowAssetModal] = useState(false);
    const [showPlatformModal, setShowPlatformModal] = useState(false);
    
    const handleAddAssetClick = () => {
        setShowAssetModal(true);
    }
    
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === "idle") {
            setShowAssetModal(false);
        }
    }, [navigation.state]);

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
                {showAssetModal && <AddAssetModal isOpen={showAssetModal} onClose={() => setShowAssetModal(false)} openPlatformModal={() => setShowPlatformModal(true)} platforms={walletTabs} />}
                {showPlatformModal && <AddPlatformModal isOpen={showPlatformModal} onClose={() => setShowPlatformModal(false)} />}
                <SearchInput
                    handleSearch={handleSearch}
                    label={translations[language].walletPage.searchbarLabel}
                    placeholder={translations[language].walletPage.searchbarPlaceholder}
                />
                <TabsBar<WalletTab> tabs={walletTabs} activeTab={activeTab} handleTabSwitch={handleTabSwitch} />
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
    const [coingeckoData, assetsFirestore, walletTabs] = await Promise.all([
        loadAssetPrices<{ coingeckoId: string }[]>({ assets, currency }),
        loadWalletAssets<WalletAsset[]>("wallet-assets", ["name", "amount", "market"]),
        loadWalletAssets<WalletTab[]>("wallet-tabs", ["name"]),
    ]);

    return { coingeckoData, assetsFirestore, walletTabs };
}

export async function action({request}: { request: Request }) {
    const formData = await request.formData();
    const data = parseWalletAssetRequest(formData);
    await addData(data)
    return redirect("/");
}
