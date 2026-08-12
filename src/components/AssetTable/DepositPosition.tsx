import { useTheme } from "../../hooks/useTheme";
import tableStyles from "../../styles/tableStyles";
import type { DepositData } from "../../types/WalletTypes";

export default function DepositPosition({ depositData, key, ...props }: { depositData: DepositData, key: React.Key }) {
    const { amount, date, platform } = depositData;
    const themeState = useTheme();
    return (
        <div key={key} className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
        <div className="flex flex-row w-full shrink-0 justify-between" {...props}>
            <p className="font-medium whitespace-nowrap">{amount}</p>
            <p className="font-medium whitespace-nowrap">{platform}</p>
            <p className="font-medium whitespace-nowrap">{date}</p>
        </div>
        </div>
    )
}