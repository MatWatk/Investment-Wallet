import { useTheme } from "../../hooks/useTheme";
import tableStyles from "../../styles/tableStyles";
import type { DepositData } from "../../types/WalletTypes";
import RubbishBinButton from "../Wallet_components/RubbishBinButton";

export default function DepositPosition({ depositData, handleDeleteDeposit, ...props }: { depositData: DepositData, handleDeleteDeposit: (depositId: string) => void }) {
    const { amount, date, platform } = depositData;
    const themeState = useTheme();
    return (
        <div className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
        <div className="flex flex-row w-full shrink-0 gap-10 justify-start items-center" {...props}>
            <p className="font-medium whitespace-nowrap min-w-30 flex justify-center">{amount}</p>
            <p className="font-medium whitespace-nowrap min-w-30 flex justify-center">{platform}</p>
            <p className="font-medium whitespace-nowrap min-w-30 flex justify-center">{date}</p>
            <RubbishBinButton onClick={() => handleDeleteDeposit(depositData.id)} />
        </div>
        </div>
    )
}