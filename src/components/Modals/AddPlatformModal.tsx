import ModalButton from "./ModalButton";
import ModalWrapper from "./ModalWrapper";
import ModalInput from "./ModalInput";

import { useSelector } from "react-redux";

export default function AddPlatformModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className={`text-start font-bold ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Add Platform</h2>
            <div>
                <form className="mt-4 flex flex-col gap-4">
                    <ModalInput themeState={themeState} labelText="Platform Name" inputType="text" />
                    <div className="mt-2 flex flex-row gap-4 justify-evenly">
                        <ModalButton onClick={onClose} themeState={themeState}>Close</ModalButton>
                        <ModalButton onClick={onClose} themeState={themeState}>Add Platform</ModalButton>
                    </div>
                </form>
            </div >
        </ModalWrapper >
    )
}