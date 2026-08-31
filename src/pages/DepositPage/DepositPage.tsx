import AssetTableHeader from "../../components/AssetTable/AssetTableHeader";
import { useTheme } from "../../hooks/useTheme";
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
import { useMemo, useState } from "react";
import useSortData from "../../hooks/useSortData";
import AddDepositModal from "../../components/AddDepositModal";
import { useCurrency } from "../../hooks/useCurrency";
import DeleteConfirmationModal from "../../components/Modals/DeleteConfirmationModal";
import ModalSelect from "../../components/Modals/ModalSelect";
import useExchangeRate from "../../hooks/useExchangeRate";
import SummaryBar from "../../components/Wallet_components/SummaryBar";

export default function DepositPage() {
    const language = useLanguage();
    const themeState = useTheme();
    const currency = useCurrency();

    const { depositData, platforms } = useLoaderData<{ depositData: DepositData[], platforms: WalletTab[] }>();
    const { currentExchangeRate } = useExchangeRate("PLN");

    const depositDataWithExchangeRate = useMemo(() => {
        return depositData.map(deposit => {
            const convertedAmount = deposit.currency === currency
                ? deposit.amount
                : deposit.currency === "USD"
                    ? Math.round(deposit.amount * currentExchangeRate * 100) / 100
                    : Math.round(deposit.amount / currentExchangeRate * 100) / 100;
            return { ...deposit, amount: convertedAmount };
        });
    }, [depositData, currency, currentExchangeRate]);

    const [showAddDepositModal, setShowAddDepositModal] = useState(false);
    const [editingDepositId, setEditingDepositId] = useState<string | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<string | null>(null);

    const submit = useSubmit();

    const { sortedData, requestSort, sortConfig } = useSortData(depositDataWithExchangeRate, {
        amount: (deposit) => deposit.amount ?? 0,
        platform: (deposit) => deposit.platform ?? "",
        date: (deposit) => deposit.date ?? "",
    });

    const [selectedYear, setSelectedYear] = useState("");

    const visibleData = selectedYear
        ? sortedData.filter(deposit => deposit.date.split("-")[0] === selectedYear)
        : sortedData

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

        if (!deletingDeposit) {
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

    const filteringOptions = [
        { value: "", label: "All years" },
        ...Array.from(new Set(depositData.map(deposit => deposit.date.split("-")[0]))).map(year => ({ value: year, label: year }))
    ];

    const totalValue = useMemo(() => {
        return visibleData.reduce((total, deposit) => total + (deposit.amount ?? 0), 0);
    }, [visibleData]);

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
            <div className="w-50">
                <ModalSelect
                    themeState={themeState}
                    labelText={'Filter by year'}
                    defaultValue={''}
                    options={filteringOptions}
                    name={'filter-year'}
                    onChange={(event) => {
                        setSelectedYear(event.target.value);
                    }}
                />
            </div>
            <PageContentWrapper>
                <AssetTableHeader
                    type='deposit'
                    handleSort={requestSort}
                    sortConfig={sortConfig}
                    sortableKeys={[
                        "amount",
                        "platform",
                        "date",
                    ]}
                />
                {visibleData.map((deposit) => (
                    <div key={deposit.id} className="flex items-center justify-between">
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
                <SummaryBar totalValue={totalValue} textAlign="left" />
            </PageContentWrapper>
        </>
    );
}

