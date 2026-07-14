import fetchData from "./fetchData";

export default async function loadAssetPrices<AssetsType extends { coingeckoId: string }[]>({ assets, currency }: { assets: AssetsType, currency: string }) {
    const assetIds = assets.map(asset => asset.coingeckoId).join(',');

    const useDirectApi = import.meta.env.DEV && Boolean(import.meta.env.VITE_COINGECKO_API_KEY);
    const requestUrl = useDirectApi
        ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${assetIds}&price_change_percentage=24h,30d&blockchain_site`
        : `/api/markets?vs_currency=${encodeURIComponent(currency)}&ids=${encodeURIComponent(assetIds)}`;
    const requestOptions: RequestInit = useDirectApi
        ? {
            method: 'GET',
            headers: { 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY },
        }
        : { method: 'GET' };

    try {
        const data = await fetchData(requestUrl, requestOptions);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(error)
        throw new Response('Failed to load asset prices', { status: 500 });
    }
}