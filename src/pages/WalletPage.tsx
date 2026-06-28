import AssetTableHeader from "../components/AssetTable/AssetTableHeader";
import AssetPositionName from "../components/AssetTable/AssetPositionName";
import SearchInput from "../components/AssetTable/SearchInput";
import PageHeader from "../components/PageHeader";
import PageContentWrapper from "../components/PageContentWrapper";
import TabsBar from "../components/Tabs_components/TabsBar";

import { assets } from "../constants/assets";

import tableStyles from "../styles/tableStyles";

import useSortData from "../hooks/useSortData";
import useFilter from "../hooks/useFilter";
import useRevalidatePage from "../hooks/useRevalidatePage";

import type { EditDataStatus, MarketsType, WalletAssetEditRequest, WalletTab } from "../types/WalletTypes";
import useTabSwitch from "../hooks/useTabSwitch";

import type { WalletAsset } from "../types/WalletTypes";
import { summaryTransformation, findAssetPrice, countTotalValue } from "../utils/utils";
import { convertDataForRequest, createWalletAssetEditRequest } from "../utils/requests";
import { store } from "../store";
import loadAssetPrices from "../services/api/loadAssetPrices";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import type { WalletLoaderData } from "../types/WalletTypes";
import { translations } from "../constants/translations";
import SummaryBar from "../components/Wallet_components/SummaryBar";
import AssetButton from "../components/Wallet_components/AssetButton";
import { useState } from "react";
import AddAssetModal from "../components/Modals/AddAssetModal";
import AddPlatformModal from "../components/Modals/AddPlatformModal";

import loadWalletAssets from "../services/api/loadFirebaseData";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { parseWalletAssetRequest, parseWalletPlatformRequest } from "../utils/parsers";
import RubbishBinButton from "../components/Wallet_components/RubbishBinButton";
import actionAssetFirebase from "../services/api/actionAssetFirebase";
import actionPlatformFirebase from "../services/api/actionPlatformFirebase";

export default function WalletPage() {
    const currency = useCurrency();
    const language = useLanguage();
    const themeState = useTheme();
    useRevalidatePage(currency);

    const { coingeckoData, assetsFirestore, walletTabs } = useLoaderData<WalletLoaderData>();
    useRevalidatePage(walletTabs.length);
    useRevalidatePage(assetsFirestore.length);

    const { sortedData, requestSort, sortConfig } = useSortData<WalletAsset, "name" | "amount" | "value">(assetsFirestore, {
        name: (asset) => asset.name,
        amount: (asset) => asset.amount,
        value: (asset) => findAssetPrice(assets, coingeckoData, asset) * asset.amount,
    }, { key: "name", direction: "ascending" });

    const { visibleAssets, handleSearch } = useFilter({ sortedData });
    const { activeTab, handleTabSwitch, actualVisibleAssets } = useTabSwitch<MarketsType, WalletAsset>
        (
            "Summary",
            visibleAssets,
            asset => asset.market,
            summaryTransformation
        );


    const totalValue = countTotalValue(actualVisibleAssets, assets, coingeckoData);

    const [showAssetModal, setShowAssetModal] = useState(false);
    const [showPlatformModal, setShowPlatformModal] = useState(false);

    const [assetFormData, setAssetFormData] = useState<WalletAssetEditRequest | null>(null);
    const [editStatus, setEditStatus] = useState<EditDataStatus>("add");

    const handleAddAssetClick = () => {
        setEditStatus("add");
        setAssetFormData(null);
        setShowAssetModal(true);
    }

    const submit = useSubmit();

    const handleDelete = async (assetId: string) => {
        setEditStatus("delete");
        const reqData = createWalletAssetEditRequest(
            actualVisibleAssets,
            assets,
            coingeckoData,
            currency,
            assetId,
            "delete"
        );
        const formData = convertDataForRequest(reqData);
        submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        });
    }

    const handleEdit = async (assetId: string) => {
        setShowAssetModal(true);
        setEditStatus("edit");
        const reqData = createWalletAssetEditRequest(
            actualVisibleAssets,
            assets,
            coingeckoData,
            currency,
            assetId,
            "edit"
        );
        setAssetFormData(reqData);
    }

    return (
        <>
            <div className="mb-6 flex flex-row items-center gap-4">
                <PageHeader title={translations[language].walletPage.walletHeader} />
                <div className="flex flex-row gap-5 ml-auto">
                    <AssetButton
                        onClick={handleAddAssetClick}>
                        {translations[language].walletPage.addAssetButton}
                    </AssetButton>
                    <AssetButton
                        onClick={() => setShowPlatformModal(true)}>
                        {translations[language].walletPage.addPlatform}
                    </AssetButton>
                </div>
            </div>
            <PageContentWrapper>
                {showAssetModal &&
                    <AddAssetModal
                        isOpen={showAssetModal}
                        onClose={() => setShowAssetModal(false)}
                        openPlatformModal={() => setShowPlatformModal(true)}
                        platforms={walletTabs}
                        defaultData={assetFormData}
                        editStatus={editStatus} />}
                {showPlatformModal &&
                    <AddPlatformModal
                        isOpen={showPlatformModal}
                        onClose={() => setShowPlatformModal(false)}
                        walletTabs={walletTabs} />}
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
                    if (walletAsset.amount === 0) {
                        return null;
                    }
                    return (
                        <div
                            key={walletAsset.id}
                            className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
                            {assets.find(a => a.name === walletAsset.name)?.image && (
                                <div className="min-w-28 flex gap-3 whitespace-nowrap items-center">
                                    <AssetPositionName
                                        name={walletAsset.name}
                                        image={assets.find(a => a.name === walletAsset.name)?.image || ""} />
                                    {activeTab !== "Summary" &&
                                        <>
                                            <AssetButton onClick={() => handleEdit(walletAsset.id)} big={false}>Edit</AssetButton>
                                            <RubbishBinButton onClick={() => handleDelete(walletAsset.id)} />
                                        </>}
                                </div>
                            )}
                            <div className="ml-auto flex flex-row gap-2 shrink-0 items-center whitespace-nowrap">
                                <p className="w-33 text-center flex items-center justify-center gap-2 shrink-0">
                                    {Number(Number(walletAsset.amount).toFixed(2))}
                                </p>
                                <p className="w-25 text-center flex items-center justify-center gap-2 shrink-0">
                                    {Number(Number(countedPrice).toFixed(2))}
                                </p>
                                <p className="w-22 text-right shrink-0">{currency}</p>
                            </div>
                        </div>
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
        loadWalletAssets<WalletAsset[]>("wallet-edit-history", ["name", "amount", "market"]),
        loadWalletAssets<WalletTab[]>("wallet-tabs", ["platformName"]),
    ]);

    return { coingeckoData, assetsFirestore, walletTabs };
}

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    if (formData.get("actionRequestType") === "asset") {
        const data = parseWalletAssetRequest(formData);
        await actionAssetFirebase(data);
        return redirect("/");
    }
    if (formData.get("actionRequestType") === "platform") {
        const data = parseWalletPlatformRequest(formData);
        await actionPlatformFirebase(data);
        return redirect("/");
    }
}
