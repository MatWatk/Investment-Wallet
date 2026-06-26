export default function Tab({ platformName, isActive, onClick, themeState }: { platformName: string, isActive: boolean, onClick: () => void, themeState: boolean }) {
    return (
        <div key={platformName} className={`flex items-center justify-center w-full h-full ${isActive ? (themeState ? "rounded-lg bg-linear-to-b from-violet-200 to-violet-300" : "rounded-lg bg-linear-to-b from-gray-400 to-gray-600") : ""}`}>
            <button onClick={onClick} key={platformName} className={`w-full h-full text-sm mb-2 ${themeState ? "hover:text-violet-400" : "hover:text-yellow-400"} ${isActive ? (themeState ? "text-violet-800" : "text-yellow-400") : (themeState ? "text-gray-500" : "text-gray-400")}`}>{platformName}</button>
        </div>
    )
}