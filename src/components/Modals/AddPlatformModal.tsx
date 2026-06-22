import ModalButton from "./ModalButton";
import ModalWrapper from "./ModalWrapper";
import ModalInput from "./ModalInput";

import { useTheme } from "../../hooks/useTheme";

export default function AddPlatformModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const themeState = useTheme();
    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <h2 className={`text-start font-bold ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Add Platform</h2>
            <div>
                <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex flex-col gap-4">
                    <ModalInput themeState={themeState} labelText="Platform Name" inputType="text" name="market"/>
                    <div className="mt-2 flex flex-row gap-4 justify-evenly">
                        <ModalButton onClick={onClose} themeState={themeState}>Close</ModalButton>
                        <ModalButton onClick={onClose} themeState={themeState}>Add Platform</ModalButton>
                    </div>
                </form>
            </div >
        </ModalWrapper >
    )
}