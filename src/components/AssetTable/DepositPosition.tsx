import { translations } from "../../constants/translations";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import tableStyles from "../../styles/tableStyles";
import type { DepositData } from "../../types/WalletTypes";
import AssetButton from "../Wallet_components/AssetButton";
import RubbishBinButton from "../Wallet_components/RubbishBinButton";

export default function DepositPosition({ depositData, handleDeleteDeposit, handleEditDeposit, ...props }: { depositData: DepositData, handleDeleteDeposit: (depositId: string) => void, handleEditDeposit: (depositId: string) => void }) {
    const { amount, date, platform } = depositData;
    const themeState = useTheme();
    const language = useLanguage();
    return (
        <div className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
            <div className="flex flex-row w-full shrink-0 gap-10 justify-start items-center" {...props}>
                <p className={tableStyles.tablePosition}>{amount}</p>
                <p className={tableStyles.tablePosition}>{platform}</p>
                <p className={tableStyles.tablePosition}>{date}</p>
                <div className="ml-4 flex shrink-0 items-center gap-2">
                    <AssetButton
                        id={`edit-asset-button-${depositData.id}`}
                        onClick={() => handleEditDeposit(depositData.id)}
                        big={false}>
                        {translations[language].depositPage.editDepositButton}
                    </AssetButton>
                    <RubbishBinButton onClick={() => handleDeleteDeposit(depositData.id)} />
                </div>

            </div>
        </div>
    )
}