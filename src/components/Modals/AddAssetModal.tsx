import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import ModalInput from "./ModalInput";
import ModalSelect from "./ModalSelect";
import ModalRowWrapper from "./ModalRowWrapper";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";

export default function AddAssetModal({ isOpen, onClose, openPlatformModal }: { isOpen: boolean, onClose: () => void, openPlatformModal: () => void }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

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
                    options={[
                        { value: "asset1", label: "Asset 1" },
                        { value: "asset2", label: "Asset 2" }
                    ]}
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
                        options={[
                            { value: "platform1", label: "Platform 1" },
                            { value: "platform2", label: "Platform 2" }
                        ]}
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