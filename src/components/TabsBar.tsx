import { useSelector } from "react-redux";

export default function TabsBar<T extends { name: string }>({ tabs, activeTab, handleTabSwitch }: { tabs: T[], activeTab: T["name"], handleTabSwitch: (tab: T["name"]) => void }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

    return (
        <div className={`flex items-center rounded border-b ${themeState ? "border-violet-400 bg-violet-200 text-violet-900" : "border-gray-400 bg-gray-700 text-yellow-500"} w-full h-8 text-xs font-bold shrink-0 gap-4 flex-row justify-evenly`}>
            {tabs.map((tab) => {
                const activeTabClass = tab.name === activeTab ? (themeState ? "text-violet-800" : "text-yellow-400") : (themeState ? "text-gray-500" : "text-gray-400");
                return (
                    <div key={tab.name} className={`flex items-center justify-center w-full h-full ${ tab.name === activeTab ? (themeState ? "rounded-lg bg-linear-to-b from-violet-200 to-violet-300" : "rounded-lg bg-linear-to-b from-gray-400 to-gray-600") : ""}`}>
                        <button onClick={() => handleTabSwitch(tab.name)} key={tab.name} className={`w-full h-full text-sm mb-2 ${themeState ? "hover:text-violet-400" : "hover:text-yellow-400"} ${activeTabClass}`}>{tab.name}</button>
                    </div>
                )
            })}
        </div>
    )
}