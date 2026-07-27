import { assets } from "../../constants/assets";
import loadAssetPrices from "../../services/api/loadAssetPrices";
import loadWalletAssets from "../../services/api/loadFirebaseData";
import type { WalletAsset, WalletTab } from "../../types/WalletTypes";
import { checkAuth, getCurrentUser } from "../../utils/utils";

export async function loader() {
    const loggedUser = await getCurrentUser();
    checkAuth(loggedUser);
    const currency = "USD";
    const [coingeckoData, assetsFirestore, walletTabs] = await Promise.all([
        loadAssetPrices<{ coingeckoId: string }[]>({ assets, currency }),
        loadWalletAssets<WalletAsset[]>("wallet-edit-history", ["name", "amount", "market", "loggedUser", "averagePrice"], loggedUser || ""),
        loadWalletAssets<WalletTab[]>("wallet-tabs", ["platformName", "loggedUser"], loggedUser || ""),
    ]);

    return { coingeckoData, assetsFirestore, walletTabs };
}