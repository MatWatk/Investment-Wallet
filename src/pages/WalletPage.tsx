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

import type { EditDataStatus, WalletAssetEditRequest, WalletTab } from "../types/WalletTypes";
import useTabSwitch from "../hooks/useTabSwitch";

import type { WalletAsset } from "../types/WalletTypes";
import { summaryTransformation, findAssetPrice, countTotalValue, checkAuth, getCurrentUser, calculateAvaragePrice } from "../utils/utils";
import { convertDataForRequest, createWalletAssetEditRequest } from "../utils/requests";
import { store } from "../store";
import loadAssetPrices from "../services/api/loadAssetPrices";
import { redirect, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import type { WalletLoaderData } from "../types/WalletTypes";
import { translations } from "../constants/translations";
import SummaryBar from "../components/Wallet_components/SummaryBar";
import AssetButton from "../components/Wallet_components/AssetButton";
import { useCallback, useMemo, useState } from "react";
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
import DeleteConfirmationModal from "../components/Modals/DeleteConfirmationModal";
import { auth } from "../services/firebase/config";
import LoadingModal from "../components/Modals/LoadingModal";

export default function WalletPage() {
    const currency = useCurrency();
    const language = useLanguage();
    const themeState = useTheme();
    useRevalidatePage(currency);

    const navigation = useNavigation();

    const loggedUser = auth.currentUser?.email || "";

    const { coingeckoData, assetsFirestore, walletTabs } = useLoaderData<WalletLoaderData>();

    useRevalidatePage(walletTabs.length);

    const filterTabsForUser = useMemo(() => {
        return walletTabs.filter(tab => tab.loggedUser === loggedUser);
    }, [walletTabs, loggedUser]
    );

    useRevalidatePage(assetsFirestore.length);

    const filterDataForUser = useCallback(
        (asset: WalletAsset) => asset.loggedUser === loggedUser,
        [assetsFirestore, loggedUser]
    );

    const { sortedData, requestSort, sortConfig } = useSortData<WalletAsset, "name" | "amount" | "value">
        (assetsFirestore, {
            name: (asset) => asset.name,
            amount: (asset) => asset.amount,
            value: (asset) => findAssetPrice(assets, coingeckoData, asset) * asset.amount,
        },
            { key: "name", direction: "ascending" },
            filterDataForUser
        );

    const { visibleAssets, handleSearch } = useFilter({ sortedData });
    const { activeTab, handleTabSwitch, actualVisibleAssets, setActiveTab } = useTabSwitch<string, WalletAsset>
        (
            "Summary",
            visibleAssets,
            asset => asset.market,
            summaryTransformation
        );


    const totalValue = countTotalValue(actualVisibleAssets, assets, coingeckoData);

    const [showAssetModal, setShowAssetModal] = useState(false);
    const [showPlatformModal, setShowPlatformModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<string | null>(null);

    const [assetFormData, setAssetFormData] = useState<WalletAssetEditRequest | null>(null);
    const [editStatus, setEditStatus] = useState<EditDataStatus>("add");

    const handleAddAssetClick = () => {
        setEditStatus("add");
        setAssetFormData(null);
        setShowAssetModal(true);
    }

    const submit = useSubmit();

    const handleDelete = (assetId: string) => {
        setShowDeleteConfirmModal(assetId);
    }

    const deleteAsset = async (assetId: string) => {
        setEditStatus("delete");
        const reqData = createWalletAssetEditRequest(
            actualVisibleAssets,
            currency,
            assetId,
            "delete",
            loggedUser,
            calculateAvaragePrice(assetsFirestore, activeTab)
        );
        const formData = convertDataForRequest(reqData);
        submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        });
        setShowDeleteConfirmModal(null);
    }

    const handleEdit = async (assetId: string) => {
        setShowAssetModal(true);
        setEditStatus("edit");
        const reqData = createWalletAssetEditRequest(
            actualVisibleAssets,
            currency,
            assetId,
            "edit",
            loggedUser,
            calculateAvaragePrice(assetsFirestore, activeTab)
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
                {navigation.state !== "idle" && <LoadingModal />}
                {showAssetModal &&
                    <AddAssetModal
                        isOpen={showAssetModal}
                        onClose={() => setShowAssetModal(false)}
                        openPlatformModal={() => setShowPlatformModal(true)}
                        platforms={filterTabsForUser}
                        defaultData={assetFormData}
                        editStatus={editStatus}
                        coingeckoData={coingeckoData} />}
                {showPlatformModal &&
                    <AddPlatformModal
                        isOpen={showPlatformModal}
                        onClose={() => setShowPlatformModal(false)}
                        walletTabs={filterTabsForUser}
                        allAssets={assetsFirestore}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab} />}
                <SearchInput
                    handleSearch={handleSearch}
                    label={translations[language].walletPage.searchbarLabel}
                    placeholder={translations[language].walletPage.searchbarPlaceholder}
                />
                <TabsBar<WalletTab> tabs={filterTabsForUser} activeTab={activeTab} handleTabSwitch={handleTabSwitch} />
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
                                            <AssetButton onClick={() => handleEdit(walletAsset.id)} big={false}>{translations[language].walletPage.editButton}</AssetButton>
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
                            {showDeleteConfirmModal === walletAsset.id &&
                                <DeleteConfirmationModal
                                    objectToDelete={walletAsset}
                                    closeModal={() => setShowDeleteConfirmModal(null)}
                                    allAssets={actualVisibleAssets}
                                    handleConfirmDelete={() => deleteAsset(walletAsset.id)}
                                />
                            }
                        </div>
                    )
                })}
                <SummaryBar totalValue={totalValue} />
            </PageContentWrapper>
        </>
    );
}

export async function loader() {
    const loggedUser = await getCurrentUser();
    checkAuth(loggedUser);
    const currency = store.getState().currency.currency;
    const [coingeckoData, assetsFirestore, walletTabs] = await Promise.all([
        loadAssetPrices<{ coingeckoId: string }[]>({ assets, currency }),
        loadWalletAssets<WalletAsset[]>("wallet-edit-history", ["name", "amount", "market", "loggedUser", "averagePrice"], loggedUser || ""),
        loadWalletAssets<WalletTab[]>("wallet-tabs", ["platformName", "loggedUser"], loggedUser || ""),
    ]);

    return { coingeckoData, assetsFirestore, walletTabs };
}

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    if (formData.get("actionRequestType") !== "asset" && formData.get("actionRequestType") !== "platform") {
        throw new Response("Invalid actionRequestType", { status: 400 });
    }

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
