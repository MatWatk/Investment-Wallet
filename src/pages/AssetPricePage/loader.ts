import { assets } from "../../constants/assets";
import loadAssetPrices from "../../services/api/loadAssetPrices";
import { store } from "../../store/index";
import { checkAuth, getCurrentUser } from "../../utils/utils";

export async function loader() {
    const loggedUser = await getCurrentUser();
    checkAuth(loggedUser);
    const currency = store.getState().currency.currency;

    return loadAssetPrices<{ coingeckoId: string }[]>({ assets, currency });
}