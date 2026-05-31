import fetchData from "../services/api/fetchData";
import { useLoaderData } from "react-router-dom";
import { assets } from "../constants/assets";

import tablestyles from "../styles/tableStyles";

import greenUpArrow from "../assets/greenUpArrow.png";
import redDownArrow from "../assets/redDownArrow.png";
import { formatPercent } from "../utils/utils";

interface CoinMarketData {
    id: string;
    current_price: number;
    price_change_percentage_24h_in_currency: number | null;
    price_change_percentage_30d_in_currency: number | null;
}

export default function AssetPricePage() {
    const data = useLoaderData<CoinMarketData[]>();
    const dataById = Object.fromEntries(data.map((coin) => [coin.id, coin]));

    return (
        <>
            <div className={tablestyles.tableHeader}>
                <p className="min-w-25 flex-1">Asset name</p>
                <p className="h-6 w-12 mr-11">Logo</p>
                <p className="h-8 w-18 text-xs text-center mr-8 shrink-0">Last 24h change</p>
                <p className="h-8 w-18 text-xs text-center shrink-0">Last 30d change</p>
                <p className="min-w-25 shrink-0 text-right mr-4">Price</p>
                <p className="w-25 text-right shrink-0">Currency</p>
            </div>
            {assets.map(asset => {
                const coinData = dataById[asset.coingeckoId] as CoinMarketData | undefined;
                const change24h = coinData?.price_change_percentage_24h_in_currency;
                const change30d = coinData?.price_change_percentage_30d_in_currency;

                return (
                <div key={asset.name} className={tablestyles.tableRow}>
                    <p className="min-w-25 flex-1 font-medium">{asset.name}</p>
                    <img src={asset.image} alt={`${asset.name} logo`} className="h-6 w-6 mr-16" />
                    <div className="w-18 text-xs text-center mr-8 flex items-center justify-center gap-2 shrink-0">
                        {(change24h ?? 0) > 0 && <img src={greenUpArrow} alt="Up arrow" className="h-4 w-4" />}
                        {(change24h ?? 0) < 0 && <img src={redDownArrow} alt="Down arrow" className="h-4 w-4" />}
                        <span>{formatPercent(change24h)}</span>
                    </div>
                    <div className="w-18 text-xs text-center flex items-center justify-center gap-2">
                        {(change30d ?? 0) > 0 && <img src={greenUpArrow} alt="Up arrow" className="h-4 w-4" />}
                        {(change30d ?? 0) < 0 && <img src={redDownArrow} alt="Down arrow" className="h-4 w-4" />}
                        <span>{formatPercent(change30d)}</span>
                    </div>
                    <p className="min-w-25 shrink-0 text-right">{coinData?.current_price}</p>
                    <p className="w-25 text-right shrink-0 mr-4">USD</p>
                </div>
                );
            })}
        </>

    )
}

export function loader() {
    const assetIds = assets.map(asset => asset.coingeckoId).join(',');
    return fetchData(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetIds}&price_change_percentage=24h,30d`, { method: 'GET', headers: { 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY } })
}