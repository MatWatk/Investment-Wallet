import { useTheme } from "../../hooks/useTheme";
import tableStyles from "../../styles/tableStyles";
import type { DepositData } from "../../types/WalletTypes";

export default function DepositPosition({ depositData, key, ...props }: { depositData: DepositData, key: React.Key }) {
    const { amount, date, platform } = depositData;
    const themeState = useTheme();
    return (
        <div key={key} className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
        <div className="flex flex-row w-full shrink-0 gap-10 justify-start items-center" {...props}>
            <p className="font-medium whitespace-nowrap min-w-30 flex justify-center">{amount}</p>
            <p className="font-medium whitespace-nowrap min-w-30 flex justify-center">{platform}</p>
            <p className="font-medium whitespace-nowrap min-w-30 flex justify-center">{date}</p>
        </div>
        </div>
    )
}