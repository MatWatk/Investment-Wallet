import { getCurrentUser } from "../../utils/utils";
import type { WalletTab } from "../../types/WalletTypes";
import loadFirebaseData from "../../services/api/loadFirebaseData";
import type { DepositData } from "../../types/DepositTypes";
import { queryClient } from "../../App";

export async function loader() {
    const loggedUser = await getCurrentUser();

    await queryClient.ensureQueryData({
        queryKey: ["userDeposits", loggedUser],
        queryFn: async () => {
            return {
                depositData: await loadFirebaseData<DepositData>('deposit', ['amount', 'date', 'platform', 'loggedUser', 'currency'], loggedUser || ''),
                platforms: await loadFirebaseData<WalletTab>("wallet-tabs", ["platformName", "loggedUser"], loggedUser || '')
            };
        }
    });
}