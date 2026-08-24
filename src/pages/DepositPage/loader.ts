import { getCurrentUser } from "../../utils/utils";
import type { WalletTab } from "../../types/WalletTypes";
import loadFirebaseData from "../../services/api/loadFirebaseData";
import type { DepositData } from "../../types/DepositTypes";

export async function loader() {
    const loggedUser = await getCurrentUser();

    const depositData = await loadFirebaseData<DepositData>('deposit', ['amount', 'date', 'platform', 'loggedUser', 'currency'], loggedUser || '');
    const platforms = await loadFirebaseData<WalletTab>("wallet-tabs", ["platformName", "loggedUser"], loggedUser || '');
    return { depositData, platforms };
}