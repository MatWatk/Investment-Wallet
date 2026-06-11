export default function TabsBar<T extends { name: string }>({ tabs, activeTab, handleTabSwitch }: { tabs: T[], activeTab: T["name"], handleTabSwitch: (tab: T["name"]) => void }) {

    return (
        <div className={`flex items-center rounded border-b border-violet-400 w-full bg-violet-200 h-8 text-xs text-violet-900 font-bold shrink-0 gap-4 flex-row justify-evenly`}>
            {tabs.map((tab) => {
                const activeTabClass = tab.name === activeTab ? "text-violet-800" : "text-gray-500";
                return (
                    <div key={tab.name} className={`flex items-center justify-center w-full h-full ${ tab.name === activeTab ? "rounded-lg bg-linear-to-b from-violet-200 to-violet-300 " : ""}`}>
                        <button onClick={() => handleTabSwitch(tab.name)} key={tab.name} className={`w-full h-full text-sm mb-2 hover:text-violet-400 ${activeTabClass}`}>{tab.name}</button>
                    </div>
                )
            })}
        </div>
    )
}