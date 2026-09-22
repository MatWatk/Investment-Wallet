import { assets } from "../../constants/assets";
import loadAssetPrices from "../../services/api/loadAssetPrices";
import { store } from "../../store/index";
import { checkAuth, getCurrentUser } from "../../utils/utils";
import { queryClient } from "../../App";

export async function loader() {
    const loggedUser = await getCurrentUser();
    checkAuth(loggedUser);
    // const currency = store.getState().currency.currency;

    // await queryClient.ensureQueryData({
    //     queryKey: ["assetPrices", { assets, currency }],
    //     queryFn: () => loadAssetPrices<{ coingeckoId: string }[]>({ assets, currency }),
    // });
}