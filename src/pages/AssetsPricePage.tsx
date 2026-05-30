import fetchData from "../services/api/fetchData";
import { useLoaderData } from "react-router-dom";
import { assets } from "../constants/assets";

export default function AssetPricePage() {
    const data = useLoaderData();
    console.log(data);
    
    return (
        <>
        {assets.map(asset => (
            <div key={asset.name} className="flex flex-row items-center justify-start gap-2 rounded bg-violet-100 p-4 shadow">
                <p>{asset.name}</p>
                <img src={asset.image} alt={`${asset.name} logo`} className="w-6 h-6" />
                <p>{data[asset.coingeckoId]?.usd}</p>
                <p>USD</p>
            </div>
        ))}

        </>

    )
}

export function loader() {
    const assetIds = assets.map(asset => asset.coingeckoId).join(',');
    return fetchData(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd,pln&ids=${assetIds}`, { method: 'GET', headers: { 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY } })
}