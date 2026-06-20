import { useTheme } from "../../hooks/useTheme";

export default function ModalWrapper({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    const themeState = useTheme();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/80 p-4" onClick={onClose}>
            <div
                className={`w-full max-w-md max-h-[calc(100vh-3rem)] overflow-auto rounded-lg p-6 shadow-xl ${themeState ? "bg-white" : "bg-gray-700"}`}
                onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>

    )
}