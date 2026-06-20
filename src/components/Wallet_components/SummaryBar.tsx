import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { useCurrency } from "../../hooks/useCurrency";
import { translations } from "../../constants/translations";

export default function SummaryBar({ totalValue }: { totalValue: number }) {
    const themeState = useTheme();
    const language = useLanguage();
    const currency = useCurrency();

    return (
        <div className={`flex flex-row items-center gap-2 p-4 rounded-md bg-linear-to-b ${themeState ? "from-gray-200 to-violet-300" : "from-gray-700 to-gray-900"} h-10 w-full shrink-0`}>
            <div className="ml-auto flex flex-row gap-2 shrink-0 items-center whitespace-nowrap">
                <p className="w-25 text-center flex items-center justify-center gap-2 shrink-0 mr-8">{translations[language].walletPage.summaryBar}</p>
                <p className="font-bold mr-4">{totalValue.toFixed(2)}</p>
                <p className="w-22 text-right shrink-0">{currency}</p>
            </div>
        </div>
    );
}