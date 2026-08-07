import fetchData from "./fetchData";

export default async function loadCurrencyExchRate(currency: string) {

    try {
        const url = `https://open.er-api.com/v6/latest/${currency}`;
        const data = await fetchData(url);
        return data;
    } catch (error) {
        console.error(error)
        throw new Response('Failed to load currency exchange rate', { status: 500 });
    }
}