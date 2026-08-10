import AssetTableHeader from "../../components/AssetTable/AssetTableHeader";
import AssetPositionName from "../../components/AssetTable/AssetPositionName";
import SearchInput from "../../components/AssetTable/SearchInput";
import PageHeader from "../../components/PageHeader";
import PageContentWrapper from "../../components/PageContentWrapper";
import TabsBar from "../../components/Tabs_components/TabsBar";
import SummaryEarnOrLossField from "../../components/Wallet_components/SummaryEarnOrLossField";

import { assets } from "../../constants/assets";

import tableStyles from "../../styles/tableStyles";

import useSortData from "../../hooks/useSortData";
import useFilter from "../../hooks/useFilter";
import useRevalidatePage from "../../hooks/useRevalidatePage";

import type { EditDataStatus, WalletAssetEditRequest, WalletTab } from "../../types/WalletTypes";
import useTabSwitch from "../../hooks/useTabSwitch";

import type { WalletAsset } from "../../types/WalletTypes";
import { summaryTransformation, findAssetPrice, countTotalValue, prepareDataForStatistics, calculateTotalEarnOrLoss } from "../../utils/utils";
import { convertDataForRequest, createWalletAssetEditRequest } from "../../utils/requests";
import { useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import type { WalletLoaderData } from "../../types/WalletTypes";
import { translations } from "../../constants/translations";
import SummaryBar from "../../components/Wallet_components/SummaryBar";
import AssetButton from "../../components/Wallet_components/AssetButton";
import { useMemo, useState } from "react";
import AddAssetModal from "../../components/Modals/AddAssetModal";
import AddPlatformModal from "../../components/Modals/AddPlatformModal";

import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { useCurrency } from "../../hooks/useCurrency";
import useExchangeRate from "../../hooks/useExchangeRate";
import RubbishBinButton from "../../components/Wallet_components/RubbishBinButton";
import DeleteConfirmationModal from "../../components/Modals/DeleteConfirmationModal";
import { auth } from "../../services/firebase/config";
import LoadingModal from "../../components/Modals/LoadingModal";

export default function WalletPage() {
    const currency = useCurrency();
    const language = useLanguage();
    const themeState = useTheme();
    const { currentExchangeRate } = useExchangeRate(currency);
    useRevalidatePage(currency);

    const navigation = useNavigation();

    const loggedUser = auth.currentUser?.email || "";

    const { coingeckoData, assetsFirestore, walletTabs } = useLoaderData<WalletLoaderData>();

    useRevalidatePage(walletTabs.length);

    const filterTabsForUser = walletTabs.filter(tab => tab.loggedUser === loggedUser);

    useRevalidatePage(assetsFirestore.length);

    const filterDataForUser = (asset: WalletAsset) => asset.loggedUser === loggedUser;

    const { sortedData, requestSort, sortConfig } = useSortData<WalletAsset, "name" | "amount" | "value">
        (assetsFirestore, {
            name: (asset) => asset.name,
            amount: (asset) => asset.amount,
            value: (asset) => findAssetPrice(assets, coingeckoData, asset) * asset.amount * currentExchangeRate,
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


    const totalValue = countTotalValue(actualVisibleAssets, assets, coingeckoData) * currentExchangeRate;

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
            assetInvestmentValues
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
            assetInvestmentValues
        );
        setAssetFormData(reqData);
    }

    const assetInvestmentValues = prepareDataForStatistics(assetsFirestore, coingeckoData, activeTab);

    const totalEarnOrLoss = useMemo(() =>
        calculateTotalEarnOrLoss(assetsFirestore, coingeckoData),
        [assetsFirestore, coingeckoData]);

    return (
        <>
            <div className="mb-6 flex flex-wrap items-start gap-4 shrink-0">
                <PageHeader title={translations[language].walletPage.walletHeader} />
                <div className="ml-auto flex w-full flex-wrap justify-end gap-3 sm:w-auto sm:flex-nowrap sm:gap-5">
                    <AssetButton
                        id={"add-asset-button"}
                        onClick={handleAddAssetClick}>
                        {translations[language].walletPage.addAssetButton}
                    </AssetButton>
                    <AssetButton
                        id={"add-platform-button"}
                        onClick={() => setShowPlatformModal(true)}>
                        {translations[language].walletPage.addPlatform}
                    </AssetButton>
                </div>
            </div>
            <SummaryEarnOrLossField
                totalPercentage={Number(totalEarnOrLoss.totalPercentage)}
                totalEarnOrLoss={Number(totalEarnOrLoss.totalEarnOrLoss)} />
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
                    const countedPrice = assetPrice * walletAsset.amount * currentExchangeRate;
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
                                        id={`asset-position-name-${walletAsset.name.trim()}`}
                                        name={walletAsset.name}
                                        image={assets.find(a => a.name === walletAsset.name)?.image || ""}
                                        earnOrLossValue={assetInvestmentValues[walletAsset.name].earnOrLossPercentage} />
                                    {activeTab !== "Summary" &&
                                        <div className="ml-4 flex shrink-0 items-center gap-2">
                                            <AssetButton
                                                id={`edit-asset-button-${walletAsset.name.trim()}`}
                                                onClick={() => handleEdit(walletAsset.id)}
                                                big={false}>
                                                {translations[language].walletPage.editButton}
                                            </AssetButton>
                                            <RubbishBinButton
                                                id={`delete-asset-button-${walletAsset.name.trim()}`}
                                                onClick={() => handleDelete(walletAsset.id)} />
                                        </div>}
                                </div>
                            )}
                            <div className="ml-auto flex flex-row gap-2 shrink-0 items-center whitespace-nowrap">
                                <p id={`asset-amount-${walletAsset.name.trim()}`} className="w-33 text-center flex items-center justify-center gap-2 shrink-0">
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

