import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import Tab from "./Tab";

export default function TabsBar<T extends { platformName: string }>({ tabs, activeTab, handleTabSwitch }: { tabs: T[], activeTab: T["platformName"], handleTabSwitch: (tab: T["platformName"]) => void }) {
    const themeState = useTheme();
    const language = useLanguage();

    return (
        <div className={`flex items-center rounded border-b ${themeState ? "border-violet-400 bg-violet-200 text-violet-900" : "border-gray-400 bg-gray-700 text-yellow-500"} w-full h-8 text-xs font-bold shrink-0 gap-4 flex-row justify-evenly`}>
            <Tab platformName={'Summary'} label={translations[language].walletPage.summaryTab} isActive={'Summary' === activeTab} onClick={() => handleTabSwitch('Summary')} themeState={themeState} />
            {tabs.map((tab) => (
                <Tab key={tab.platformName} platformName={tab.platformName} isActive={tab.platformName === activeTab} onClick={() => handleTabSwitch(tab.platformName)} themeState={themeState} />
            ))}
        </div>
    )
}