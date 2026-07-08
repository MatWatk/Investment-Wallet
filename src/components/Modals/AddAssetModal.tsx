import ModalWrapper from "./ModalWrapper";
import ModalInput from "./ModalInput";
import ModalSelect from "./ModalSelect";
import ModalRowWrapper from "./ModalRowWrapper";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";
import { useTheme } from "../../hooks/useTheme";
import { Form } from "react-router-dom";

import { assets, currencies } from "../../constants/assets";
import type { EditDataStatus, WalletAssetEditRequest, WalletTab } from "../../types/WalletTypes";
import { useState } from "react";
import { auth } from "../../services/firebase/config";

export default function AddAssetModal({
    isOpen,
    onClose,
    openPlatformModal,
    platforms,
    defaultData,
    editStatus,
}: {
    isOpen: boolean,
    onClose: () => void,
    openPlatformModal: () => void,
    platforms: WalletTab[],
    defaultData?: WalletAssetEditRequest | null,
    editStatus?: EditDataStatus,
}) {

    const [isInputInvalid, setIsInputInvalid] = useState<Record<string, boolean>>({});

    const themeState = useTheme();

    const currentDate = new Date().toISOString().split("T")[0];
    const currentEditStatus = editStatus ?? "add";

    const disableField = currentEditStatus === "edit";

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalHeader title={currentEditStatus === "edit" ? "Edit Asset" : "Add Asset"} themeState={themeState} />
            <Form method="post" onSubmit={onClose} className="mt-4 flex flex-col gap-4">
                <input type="hidden" name="editStatus" value={currentEditStatus} />
                <input type="hidden" name="loggedUser" value={auth.currentUser?.email || ""} />
                <input type="hidden" name="assetId" value={defaultData?.assetId || ""} />
                <input type="hidden" name="defaultData" value={defaultData ? JSON.stringify(defaultData) : ""} />
                <input type="hidden" name="actionRequestType" value="asset" />
                {disableField && (
                    <>
                        <input type="hidden" name="name" value={defaultData?.name ?? ""} />
                        <input type="hidden" name="price" value={defaultData?.price ?? ""} />
                        <input type="hidden" name="currency" value={defaultData?.currency ?? ""} />
                        <input type="hidden" name="date" value={defaultData?.date ?? currentDate} />
                    </>
                )}
                <ModalSelect
                    themeState={themeState}
                    labelText="Asset Name"
                    name="name"
                    options={assets.map((asset) => ({ value: asset.name, label: asset.name }))}
                    defaultValue={defaultData?.name}
                    disabled={disableField}
                />
                <ModalInput
                    themeState={themeState}
                    labelText="Amount"
                    inputType="number"
                    name="amount"
                    defaultValue={defaultData?.amount}
                    invalidInput={isInputInvalid}
                    setInvalidInput={setIsInputInvalid}
                />
                <ModalRowWrapper>
                    <ModalInput
                        themeState={themeState}
                        labelText="Price"
                        inputType="number"
                        name="price" defaultValue={defaultData?.price}
                        disabled={disableField}
                        invalidInput={isInputInvalid}
                        setInvalidInput={setIsInputInvalid}
                    />
                    <ModalSelect
                        themeState={themeState}
                        labelText="Currency"
                        name="currency"
                        options={currencies.map((currency) => ({ value: currency, label: currency }))}
                        defaultValue={defaultData?.currency}
                        disabled={disableField}
                    />
                </ModalRowWrapper>
                <ModalRowWrapper>
                    <ModalSelect
                        themeState={themeState}
                        labelText="Platform"
                        name="market"
                        options={platforms.map((platform) => ({ value: platform.platformName, label: platform.platformName }))}
                        defaultValue={defaultData?.market}
                    />
                    <ModalButton
                        type="button"
                        onClick={openPlatformModal}
                        themeState={themeState}>
                        Add Platform
                    </ModalButton>
                </ModalRowWrapper>
                <ModalInput
                    themeState={themeState}
                    labelText="Date"
                    inputType="date"
                    name="date"
                    defaultValue={defaultData?.date || currentDate}
                    disabled={disableField}
                />
                <div className="mt-2 flex flex-row gap-4 justify-evenly">
                    <ModalButton type="button" onClick={onClose} themeState={themeState}>Close</ModalButton>
                    <ModalButton
                        type="submit"
                        themeState={themeState}
                        disabled={Object.values(isInputInvalid).some(Boolean)}>
                        {currentEditStatus === "edit" ? "Edit Asset" : "Add Asset"}
                    </ModalButton>
                </div>
            </Form>
        </ModalWrapper >
    );
}