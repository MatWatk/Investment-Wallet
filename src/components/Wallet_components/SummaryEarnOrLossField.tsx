import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { useCurrency } from "../../hooks/useCurrency";
import { translations } from "../../constants/translations";
import useExchangeRate from "../../hooks/useExchangeRate";

export default function SummaryEarnOrLossField({ totalPercentage, totalEarnOrLoss }: { totalPercentage: number; totalEarnOrLoss: number }) {
    const themeState = useTheme();
    const language = useLanguage();
    const currency = useCurrency();

    const { currentExchangeRate } = useExchangeRate(currency);

    return (
        <div className={`flex flex-col items-start rounded-lg border ${themeState ? "border-violet-500" : "border-gray-300"} p-2 min-w-50 w-80`}>
            <p>{translations[language].walletPage.walletStatusInPercentage}:
                <span className={`font-bold ${Number(totalPercentage) > 0 ? 'text-green-500' : 'text-red-500'}`}>{` ${totalPercentage}%`}</span>
            </p>
            <p>{translations[language].walletPage.walletStatus}:
                <span className={`font-bold ${Number(totalEarnOrLoss) > 0 ? 'text-green-500' : 'text-red-500'}`}>{` ${(totalEarnOrLoss * currentExchangeRate).toFixed(2)} ${currency}`}</span>
            </p>
        </div>
    )
}