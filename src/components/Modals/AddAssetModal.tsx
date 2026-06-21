import ModalWrapper from "./ModalWrapper";
import ModalInput from "./ModalInput";
import ModalSelect from "./ModalSelect";
import ModalRowWrapper from "./ModalRowWrapper";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";
import { useTheme } from "../../hooks/useTheme";

import { assets } from "../../constants/assets";
import type { WalletTab } from "../../types/WalletTypes";

export default function AddAssetModal({ isOpen, onClose, openPlatformModal, platforms }: { isOpen: boolean, onClose: () => void, openPlatformModal: () => void, platforms: WalletTab[] }) {
    const themeState = useTheme();

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    const currentDate = new Date().toISOString().split("T")[0];

    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <ModalHeader title="Add Asset" themeState={themeState} />
            <form onSubmit={handleFormSubmit} className="mt-4 flex flex-col gap-4">
                <ModalSelect
                    themeState={themeState}
                    labelText="Asset Name"
                    options={assets.map((asset) => ({ value: asset.name, label: asset.name }))}
                />
                <ModalInput themeState={themeState} labelText="Amount" inputType="number" />
                <ModalRowWrapper>
                    <ModalInput themeState={themeState} labelText="Price" inputType="number" />
                    <ModalSelect
                        themeState={themeState}
                        labelText="Currency"
                        options={[
                            { value: "usd", label: "USD" },
                            { value: "eur", label: "EUR" }
                        ]}
                    />
                </ModalRowWrapper>
                <ModalRowWrapper>
                    <ModalSelect
                        themeState={themeState}
                        labelText="Platform"
                        options={platforms.map((platform) => ({value:platform.name, label: platform.name}))}
                    />
                    <ModalButton onClick={openPlatformModal} themeState={themeState}>Add Platform</ModalButton>
                </ModalRowWrapper>
                <ModalInput themeState={themeState} labelText="Date" inputType="date" defaultValue={currentDate} />
                <div className="mt-2 flex flex-row gap-4 justify-evenly">
                    <ModalButton onClick={onClose} themeState={themeState}>Close</ModalButton>
                    <ModalButton onClick={onClose} themeState={themeState}>Add Asset</ModalButton>
                </div>
            </form>
        </ModalWrapper >
    );
}