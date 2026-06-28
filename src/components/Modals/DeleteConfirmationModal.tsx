import ModalWrapper from "./ModalWrapper";
import { useTheme } from "../../hooks/useTheme";
import ModalButton from "./ModalButton";
import type { WalletAsset, WalletTab } from "../../types/WalletTypes";
import { summaryTransformation } from "../../utils/utils";
import { convertDataForRequest, createPlatformEditRequest } from "../../utils/requests";
import { useSubmit } from "react-router-dom";

export default function DeleteConfirmationModal({
    platformToDelete,
    closeModal,
    allAssets,
    walletTabs
}: {
    platformToDelete: WalletTab,
    closeModal: () => void,
    allAssets: WalletAsset[],
    walletTabs: WalletTab[]
}) {

    const themeState = useTheme();
    const submit = useSubmit();

    const connectedToPlatformHistory = allAssets.filter(asset => asset.market === platformToDelete.platformName)
    const connectedAssetsToPlaform = summaryTransformation(connectedToPlatformHistory);

    const assetsToDisplay = connectedAssetsToPlaform.filter(asset => asset.amount > 0).map((asset) => {
        return (
            <p key={asset.name} className={`mt-2 text-start text-sm  ${themeState ? "text-violet-900" : "text-yellow-500"}`}><strong>{asset.name}</strong> with amount: <strong>{asset.amount}</strong></p>
        )
    });

    const handleConfirmDelete = () => {
        const reqData = createPlatformEditRequest(platformToDelete.id, walletTabs, "delete");
        const formData = convertDataForRequest(reqData);
        submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        });
        closeModal();
    }

    if (!platformToDelete) return null;

    return (
        <ModalWrapper>
            <h2 className={`text-start font-bold text-l ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Confirm Deletion</h2>
            <div>
                {assetsToDisplay.length > 0 ? (
                    <p className={`mt-2 text-start text-l border-b ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Please remove the connected assets before deleting the platform. There are {assetsToDisplay.length} connected assets:</p>
                ) : (
                    <p className={`mt-2 text-start text-l ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Are you sure you want to delete the platform?</p>
                )}
                {assetsToDisplay.length > 0 && <div className="mt-5">{assetsToDisplay}</div>}
                <div className="mt-4 flex flex-row gap-4 justify-evenly">
                    <ModalButton type="button" onClick={closeModal} themeState={themeState}>Cancel</ModalButton>
                    <ModalButton type="button" onClick={handleConfirmDelete} themeState={themeState} disabled={!!assetsToDisplay.length}>Confirm</ModalButton>
                </div>
            </div>
        </ModalWrapper>
    )
}