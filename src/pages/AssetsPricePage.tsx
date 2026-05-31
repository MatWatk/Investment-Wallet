import fetchData from "../services/api/fetchData";
import { useLoaderData } from "react-router-dom";
import { assets } from "../constants/assets";

import tablestyles from "../styles/tableStyles";

import greenUpArrow from "../assets/greenUpArrow.png";
import redDownArrow from "../assets/redDownArrow.png";

export default function AssetPricePage() {
    const data = useLoaderData();
    console.log(data);

    return (
        <>
            <div className={tablestyles.tableHeader}>
                <p className="min-w-25 flex-1">Asset name</p>
                <p className="h-6 w-6 mr-11">Logo</p>
                <p className="h-8 w-16 text-xs text-center">Last 24h change</p>
                <p className="min-w-25 shrink-0 text-right mr-7">Price</p>
                <p className="w-25 text-right shrink-0">Currency</p>
            </div>
            {assets.map(asset => (
                <div key={asset.name} className={tablestyles.tableRow}>
                    <p className="min-w-25 flex-1 font-medium">{asset.name}</p>
                    <img src={asset.image} alt={`${asset.name} logo`} className="h-6 w-6 mr-16" />
                    {(data[asset.coingeckoId]?.usd_24h_change > 0) && <img src={greenUpArrow} alt="Up arrow" className="h-4 w-4 mr-4" />}
                    {(data[asset.coingeckoId]?.usd_24h_change < 0) && <img src={redDownArrow} alt="Down arrow" className="h-4 w-4 mr-4" />}
                    <p className="min-w-25 shrink-0 text-right mr-4">{data[asset.coingeckoId]?.usd}</p>
                    <p className="w-25 text-right shrink-0 mr-4">USD</p>
                </div>
            ))}
        </>

    )
}

export function loader() {
    const assetIds = assets.map(asset => asset.coingeckoId).join(',');
    return fetchData(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd,pln&ids=${assetIds}&include_24hr_change=true`, { method: 'GET', headers: { 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY } })
}