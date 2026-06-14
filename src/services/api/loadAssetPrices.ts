import fetchData from "./fetchData";

export default function loadAssetPrices<AssetsType extends { coingeckoId: string }[]>({ assets, currency }: { assets: AssetsType, currency: string }) {
    const assetIds = assets.map(asset => asset.coingeckoId).join(',');

    return fetchData(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${assetIds}&price_change_percentage=24h,30d&blockchain_site`, { method: 'GET', headers: { 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY } })
}