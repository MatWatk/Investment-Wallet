import ModalWrapper from "./ModalWrapper";
import ModalInput from "./ModalInput";
import ModalSelect from "./ModalSelect";
import ModalRowWrapper from "./ModalRowWrapper";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";
import { useTheme } from "../../hooks/useTheme";
import { Form } from "react-router-dom";

import { assets, currencies } from "../../constants/assets";
import type { WalletTab } from "../../types/WalletTypes";

export default function AddAssetModal({ isOpen, onClose, openPlatformModal, platforms }: { isOpen: boolean, onClose: () => void, openPlatformModal: () => void, platforms: WalletTab[] }) {
    const themeState = useTheme();


    const currentDate = new Date().toISOString().split("T")[0];

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalHeader title="Add Asset" themeState={themeState} />
            <Form method="post" className="mt-4 flex flex-col gap-4">
                <ModalSelect
                    themeState={themeState}
                    labelText="Asset Name"
                    name="name"
                    options={assets.map((asset) => ({ value: asset.name, label: asset.name }))}
                />
                <ModalInput themeState={themeState} labelText="Amount" inputType="number" name="amount" />
                <ModalRowWrapper>
                    <ModalInput themeState={themeState} labelText="Price" inputType="number" name="price" />
                    <ModalSelect
                        themeState={themeState}
                        labelText="Currency"
                        name="currency"
                        options={currencies.map((currency) => ({ value: currency, label: currency }))}
                    />
                </ModalRowWrapper>
                <ModalRowWrapper>
                    <ModalSelect
                        themeState={themeState}
                        labelText="Platform"
                        name="market"
                        options={platforms.map((platform) => ({value:platform.name, label: platform.name}))}
                    />
                    <ModalButton type="button" onClick={openPlatformModal} themeState={themeState}>Add Platform</ModalButton>
                </ModalRowWrapper>
                <ModalInput themeState={themeState} labelText="Date" inputType="date" name="date" defaultValue={currentDate} />
                <div className="mt-2 flex flex-row gap-4 justify-evenly">
                    <ModalButton type="button" onClick={onClose} themeState={themeState}>Close</ModalButton>
                    <ModalButton type="submit" themeState={themeState}>Add Asset</ModalButton>
                </div>
            </Form>
        </ModalWrapper >
    );
}