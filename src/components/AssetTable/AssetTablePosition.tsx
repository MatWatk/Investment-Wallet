import type { Asset } from "../../constants/assets";
import { formatPercent } from "../../utils/utils";

import tableStyles from "../../styles/tableStyles";

import greenUpArrow from "../../assets/greenUpArrow.png";
import redDownArrow from "../../assets/redDownArrow.png";
import type { CoinMarketData } from "../../types/AssetTableTypes";

import AssetPositionName from "./AssetPositionName";

import { useSelector } from "react-redux";


export default function AssetTablePosition({ asset, dataFromCoingecko }: { asset: Asset, dataFromCoingecko: CoinMarketData[] }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    const dataById = Object.fromEntries(dataFromCoingecko.map((coin) => [coin.id, coin]));
    const coinData = dataById[asset.coingeckoId] as CoinMarketData | undefined;
    const change24h = coinData?.price_change_percentage_24h_in_currency;
    const change30d = coinData?.price_change_percentage_30d_in_currency;

    return (
        <div key={asset.name} className={themeState ? tableStyles.light.tableRow : tableStyles.dark.tableRow}>
            <AssetPositionName name={asset.name} image={asset.image} />
            <div className="w-36 text-xs text-center flex items-center justify-center gap-2 shrink-0">
                {(change24h ?? 0) > 0 && <img src={greenUpArrow} alt="Up arrow" className="h-4 w-4" />}
                {(change24h ?? 0) < 0 && <img src={redDownArrow} alt="Down arrow" className="h-4 w-4" />}
                <span>{formatPercent(change24h)}</span>
            </div>
            <div className="w-36 text-xs text-center flex items-center justify-center gap-2 shrink-0">
                {(change30d ?? 0) > 0 && <img src={greenUpArrow} alt="Up arrow" className="h-4 w-4" />}
                {(change30d ?? 0) < 0 && <img src={redDownArrow} alt="Down arrow" className="h-4 w-4" />}
                <span>{formatPercent(change30d)}</span>
            </div>
            <p className="min-w-25 shrink-0 text-right">{coinData?.current_price}</p>
            <p className="w-25 text-right shrink-0">USD</p>
        </div>
    )
}