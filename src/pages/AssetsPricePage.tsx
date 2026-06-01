import fetchData from "../services/api/fetchData";
import { useLoaderData } from "react-router-dom";
import { assets } from "../constants/assets";

import AssetTableHeader from "../components/AssetTable/AssetTableHeader";
import AssetTablePosition from "../components/AssetTable/AssetTablePosition";

export interface CoinMarketData {
    id: string;
    current_price: number;
    price_change_percentage_24h_in_currency: number | null;
    price_change_percentage_30d_in_currency: number | null;
}

export default function AssetPricePage() {
    const data = useLoaderData<CoinMarketData[]>();

    return (
        <div className="w-full overflow-x-auto">
            <AssetTableHeader
                name
                last24hChange
                last30dChange
                price
                currency
            />
            {assets.map(asset => (
                <AssetTablePosition key={asset.name} asset={asset} dataFromCoingecko={data} />
            ))}
        </div>

    )
}

export function loader() {
    const assetIds = assets.map(asset => asset.coingeckoId).join(',');
    return fetchData(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetIds}&price_change_percentage=24h,30d`, { method: 'GET', headers: { 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY } })
}