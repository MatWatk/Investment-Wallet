import ModalWrapper from "./ModalWrapper";
import { useTheme } from "../../hooks/useTheme";
import ModalButton from "./ModalButton";
import type { WalletAsset, WalletTab } from "../../types/WalletTypes";
import { summaryTransformation } from "../../utils/utils";
import { useState } from "react";

export default function DeleteConfirmationModal({
    objectToDelete,
    closeModal,
    allAssets,
    handleConfirmDelete,
}: {
    objectToDelete: WalletTab | WalletAsset,
    closeModal: () => void,
    allAssets: WalletAsset[],
    handleConfirmDelete: () => void,
}) {

    const themeState = useTheme();

    const [assetsBlockinPlatformDelete, setAssetsBlockinPlatformDelete] = useState(false);



    const deleteModalContent = () => {
        if ("platformName" in objectToDelete) {
            const connectedToPlatformHistory = allAssets.filter(asset => asset.market === objectToDelete.platformName)
            const connectedAssetsToPlaform = summaryTransformation(connectedToPlatformHistory);


            const assetsToDisplay = connectedAssetsToPlaform.filter(asset => asset.amount > 0).map((asset) => {
                return (
                    <p key={asset.name} className={`mt-2 text-start text-sm  ${themeState ? "text-violet-900" : "text-yellow-500"}`}><strong>{asset.name}</strong> with amount: <strong>{asset.amount}</strong></p>
                )
            });
            if (assetsToDisplay.length > 0 && !assetsBlockinPlatformDelete) {
                setAssetsBlockinPlatformDelete(true);
            }
            return (
                <div>
                    {assetsToDisplay.length > 0 ? (
                        <p className={`mt-2 text-start text-l border-b ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Please remove the connected assets before deleting the platform. There are {assetsToDisplay.length} connected assets:</p>
                    ) : (
                        <p className={`mt-2 text-start text-l ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Are you sure you want to delete {objectToDelete.platformName} platform?</p>
                    )}
                    {assetsToDisplay.length > 0 && <div className="mt-5">{assetsToDisplay}</div>}
                </div>
            )

        }
        else if ("amount" in objectToDelete) {
            return (
                <div>
                    <p className={`mt-2 text-start text-l ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Are you sure you want to delete <strong>{objectToDelete.name}</strong> with amount <strong>{objectToDelete.amount}</strong>?</p>
                </div>
            )
        }
        else { return null }
    }


    if (!objectToDelete) return null;

    return (
        <ModalWrapper>
            <h2 className={`text-start font-bold text-l ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Confirm Deletion</h2>

            <div>
                {deleteModalContent()}
                <div className="mt-4 flex flex-row gap-4 justify-evenly">

                    <ModalButton type="button" onClick={closeModal} themeState={themeState}>Cancel</ModalButton>
                    <ModalButton type="button" onClick={handleConfirmDelete} themeState={themeState} disabled={assetsBlockinPlatformDelete}>Confirm</ModalButton>
                </div>
            </div>
        </ModalWrapper>
    )
}