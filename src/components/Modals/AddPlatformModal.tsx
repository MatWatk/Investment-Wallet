import ModalButton from "./ModalButton";
import ModalWrapper from "./ModalWrapper";
import ModalInput from "./ModalInput";

import { useTheme } from "../../hooks/useTheme";
import { Form, useSubmit } from "react-router-dom";
import type { MarketsType, WalletAsset, WalletTab } from "../../types/WalletTypes";

import rubbishBin from "../../assets/rubbish_bin.png";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { convertDataForRequest, createPlatformEditRequest } from "../../utils/requests";

export default function AddPlatformModal({
    isOpen,
    onClose,
    walletTabs,
    allAssets,
    setActiveTab,
    activeTab,
}: {
    isOpen: boolean;
    onClose: () => void;
    walletTabs: WalletTab[];
    allAssets: WalletAsset[];
    setActiveTab: React.Dispatch<React.SetStateAction<MarketsType>>;
    activeTab: MarketsType;
}) {
    const [platformToDelete, setPlatformToDelete] = useState<WalletTab | null>(null);
    const [isInputInvalid, setIsInputInvalid] = useState<Record<string, boolean>>({});
    const submit = useSubmit();

    const themeState = useTheme();

    const handleDeletePlatform = (platform: WalletTab) => {
        setPlatformToDelete(platform);
    }

    
    const handleConfirmDelete = () => {
        const reqData = createPlatformEditRequest(platformToDelete?.id ?? "", walletTabs, "delete");
        const formData = convertDataForRequest(reqData);
        submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        });
        setPlatformToDelete(null);
        if (activeTab === platformToDelete?.platformName) {
            setActiveTab("Summary");
        }
    }

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <h2 className={`text-start font-bold ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Add Platform</h2>
            <div>
                <Form method="post" onSubmit={onClose} className="mt-4 flex flex-col gap-4">
                    <input type="hidden" name="actionRequestType" value="platform" />
                    <input type="hidden" name="editStatus" value="add" />
                    <input type="hidden" name="platformId" value="" />
                    <ModalInput
                        themeState={themeState}
                        labelText="Platform Name"
                        inputType="text"
                        name="platformName"
                        existingPlatforms={walletTabs}
                        invalidInput={isInputInvalid}
                        setInvalidInput={setIsInputInvalid} />
                    <div>
                        <h2 className={`text-start font-bold ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Platforms:</h2>
                        <ol>
                            {walletTabs.map((tab) => (
                                <li key={tab.id} className={`flex flex-row gap-4 items-center text-xl justify-start mt-2 ${themeState ? "text-violet-900" : "text-yellow-500"}`}>
                                    <p className="flex-1">{tab.platformName}</p>
                                    <button type="button" onClick={() => handleDeletePlatform(tab)}><img className="w-6 h-6" src={rubbishBin} alt="Delete" /></button>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="mt-2 flex flex-row gap-4 justify-evenly">
                        <ModalButton onClick={onClose} themeState={themeState}>Close</ModalButton>
                        <ModalButton type="submit" themeState={themeState} disabled={Object.values(isInputInvalid).some(Boolean)}>Add Platform</ModalButton>
                    </div>
                    {platformToDelete &&
                        <DeleteConfirmationModal handleConfirmDelete={handleConfirmDelete} objectToDelete={platformToDelete} closeModal={() => setPlatformToDelete(null)} allAssets={allAssets} />}
                </Form>
            </div >
        </ModalWrapper >
    )
}

