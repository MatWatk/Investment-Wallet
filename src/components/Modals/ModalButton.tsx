export default function ModalButton({ onClick, themeState, children }: { onClick: () => void; themeState: boolean; children: React.ReactNode }) {
    return (
        <div className="mt-2 flex flex-row gap-4 justify-evenly">
            <button onClick={onClick} className={`mt-4 border-2 ${themeState ? "border-violet-900 text-violet-900 hover:bg-violet-100" : "border-gray-200 text-gray-200 bg-gray-800 hover:bg-gray-600"} rounded-lg min-w-28 h-10`}>{children}</button>
          
        </div>
    )
}