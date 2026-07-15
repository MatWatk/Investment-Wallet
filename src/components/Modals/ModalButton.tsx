export default function ModalButton({
    onClick,
    themeState,
    children,
    type = "button",
    disabled = false }: {
        onClick?: () => void;
        themeState: boolean;
        children: React.ReactNode;
        type?: "button" | "submit" | "reset";
        disabled?: boolean
    }) {
    return (
        <div className="mt-2 flex flex-row gap-4 justify-evenly">
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`mt-4 border-2 rounded-lg min-w-28 h-14 ${disabled
                    ? themeState
                        ? "border-violet-300 text-violet-300 bg-gray-100 cursor-not-allowed opacity-60"
                        : "border-gray-500 text-gray-500 bg-gray-800 cursor-not-allowed opacity-60"
                    : themeState
                        ? "border-violet-900 text-violet-900 hover:bg-violet-100"
                        : "border-gray-200 text-gray-200 bg-gray-800 hover:bg-gray-600"
                    }`}>
                {children}
            </button>

        </div>
    )
}