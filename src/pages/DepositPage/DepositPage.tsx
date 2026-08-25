import AssetTableHeader from "../../components/AssetTable/AssetTableHeader";
import { convertDataForRequest } from "../../utils/requests";
import type { EditDataStatus, WalletTab } from "../../types/WalletTypes";
import type { DepositData } from "../../types/DepositTypes";
import { useLoaderData, useSubmit } from "react-router-dom";
import PageContentWrapper from "../../components/PageContentWrapper";
import PageHeader from "../../components/PageHeader";
import AssetButton from "../../components/Wallet_components/AssetButton";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../hooks/useLanguage";
import DepositPosition from "../../components/AssetTable/DepositPosition";
import { useState } from "react";
// import useSortData from "../../hooks/useSortData";
import AddDepositModal from "../../components/AddDepositModal";
import { useCurrency } from "../../hooks/useCurrency";
import DeleteConfirmationModal from "../../components/Modals/DeleteConfirmationModal";

export default function DepositPage() {
    const language = useLanguage();
    const { depositData, platforms } = useLoaderData<{ depositData: DepositData[], platforms: WalletTab[] }>();
    const currency = useCurrency();

    const [showAddDepositModal, setShowAddDepositModal] = useState(false);
    const [editingDepositId, setEditingDepositId] = useState<string | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<string | null>(null);

    const submit = useSubmit();

    // const { sortedData, requestSort, sortConfig } = useSortData(data, {
    //     name: (coin) => assetByCoingeckoId[coin.id]?.name ?? "",
    //     current_price: (coin) => coin.current_price,
    //     price_change_percentage_24h_in_currency: (coin) => coin.price_change_percentage_24h_in_currency,
    //     price_change_percentage_30d_in_currency: (coin) => coin.price_change_percentage_30d_in_currency,
    // });
    const editingDeposit = editingDepositId ? depositData.find((deposit) => deposit.id === editingDepositId) : undefined;

    const depositModal = <AddDepositModal
        defaultData={editingDeposit}
        currency={currency}
        onClose={() => {
            setShowAddDepositModal(false);
            setEditingDepositId(null);
        }}
        platforms={platforms}
    />

    const openDeleteModal = (depositId: string) => {
        setShowDeleteConfirmation(depositId);
    }

    const deleteDeposit = (depositId: string) => {
        const deletingDeposit = depositData.find((deposit) => deposit.id === depositId);

        if(!deletingDeposit) {
            console.error(`Deposit with ID ${depositId} not found.`);
            return;
        }
        const deleteRequest = {
            ...deletingDeposit,
            actionRequestType: "delete" as EditDataStatus,
        };
        const formData = convertDataForRequest(deleteRequest);
        submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        });
    }

    const openEditModal = (depositId: string) => {
        setEditingDepositId(depositId);
        setShowAddDepositModal(true);
    }


    return (
        <>
            <div className="mb-6 flex flex-wrap items-start gap-4 shrink-0">
                <PageHeader title={translations[language].depositPage.title} />
                <div className="ml-auto flex w-full flex-wrap justify-end gap-3 sm:w-auto sm:flex-nowrap sm:gap-5">
                    <AssetButton
                        id={"add-platform-button"}
                        onClick={() => {
                            setEditingDepositId(null)
                            setShowAddDepositModal(true)
                        }}>
                        {translations[language].depositPage.addDepositButton}
                    </AssetButton>
                </div>
            </div>
            <PageContentWrapper>
                <AssetTableHeader
                    type='deposit'

                    // handleSort={requestSort}
                    // sortConfig={sortConfig}
                    sortableKeys={[
                        "name",
                    ]}
                />
                {depositData.map((deposit, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <DepositPosition
                            key={deposit.id}
                            depositData={deposit}
                            openDeleteModal={openDeleteModal}
                            openEditModal={openEditModal} />
                    </div>
                ))}
                {showAddDepositModal && depositModal}
                {showDeleteConfirmation && <DeleteConfirmationModal
                    objectToDelete={depositData.find((deposit) => deposit.id === showDeleteConfirmation)!}
                    closeModal={() => setShowDeleteConfirmation(null)}
                    handleConfirmDelete={() => {
                        deleteDeposit(showDeleteConfirmation!);
                        setShowDeleteConfirmation(null);
                    }}
                />}
            </PageContentWrapper>
        </>
    );
}

