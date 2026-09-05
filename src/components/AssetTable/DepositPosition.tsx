import { translations } from "../../constants/translations";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import tableStyles from "../../styles/tableStyles";
import type { DepositData } from "../../types/DepositTypes";
import AssetButton from "../Wallet_components/AssetButton";
import RubbishBinButton from "../Wallet_components/RubbishBinButton";

export default function DepositPosition({ depositData, openDeleteModal, openEditModal, ...props }: { depositData: DepositData, openDeleteModal: (depositId: string) => void, openEditModal: (depositId: string) => void }) {
    const { amount, date, platform } = depositData;
    const themeState = useTheme();
    const language = useLanguage();
    return (
        <div id={`deposit-position-${depositData.id}`} className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
            <div className="flex flex-row w-full shrink-0 gap-10 justify-start items-center" {...props}>
                <p id={`deposit-amount-${depositData.id}`} className={tableStyles.tablePosition}>{amount}</p>
                <p id={`deposit-platform-${depositData.id}`} className={tableStyles.tablePosition}>{platform}</p>
                <p id={`deposit-date-${depositData.id}`} className={tableStyles.tablePosition}>{date}</p>
                <div className="ml-4 flex shrink-0 items-center gap-2">
                    <AssetButton
                        id={`edit-asset-button-${depositData.id}`}
                        onClick={() => openEditModal(depositData.id)}
                        big={false}>
                        {translations[language].depositPage.editDepositButton}
                    </AssetButton>
                    <RubbishBinButton onClick={() => openDeleteModal(depositData.id)} />
                </div>

            </div>
        </div>
    )
}