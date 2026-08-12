import { getCurrentUser } from "../../utils/utils";
import type { DepositData } from "../../types/WalletTypes";
import loadFirebaseData from "../../services/api/loadFirebaseData";

export async function loader() {
    const loggedUser = await getCurrentUser();

    const depositData = await loadFirebaseData<DepositData>('deposit', ['amount', 'date', 'platform', 'loggedUser'], loggedUser || '');
    return depositData ;
}