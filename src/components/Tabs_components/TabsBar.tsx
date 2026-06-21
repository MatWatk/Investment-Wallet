import { useTheme } from "../../hooks/useTheme";
import Tab from "./Tab";

export default function TabsBar<T extends { name: string }>({ tabs, activeTab, handleTabSwitch }: { tabs: T[], activeTab: T["name"], handleTabSwitch: (tab: T["name"]) => void }) {
    const themeState = useTheme();

    return (
        <div className={`flex items-center rounded border-b ${themeState ? "border-violet-400 bg-violet-200 text-violet-900" : "border-gray-400 bg-gray-700 text-yellow-500"} w-full h-8 text-xs font-bold shrink-0 gap-4 flex-row justify-evenly`}>
            <Tab name={'Summary'} isActive={'Summary' === activeTab} onClick={() => handleTabSwitch('Summary')} themeState={themeState} />
            {tabs.map((tab) => (
                <Tab key={tab.name} name={tab.name} isActive={tab.name === activeTab} onClick={() => handleTabSwitch(tab.name)} themeState={themeState} />
            ))}
        </div>
    )
}