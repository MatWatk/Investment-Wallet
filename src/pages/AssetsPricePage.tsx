import AssetTableHeader from "../components/AssetTable/AssetTableHeader";
import AssetTablePosition from "../components/AssetTable/AssetTablePosition";
import SearchInput from "../components/AssetTable/SearchInput";
import PageHeader from "../components/PageHeader";

import fetchData from "../services/api/fetchData";
import { useLoaderData } from "react-router-dom";

import { assets } from "../constants/assets";
// import { priceListTabs } from "../constants/tabs";

import useSortData from "../hooks/useSortData";
import useFilter from "../hooks/useFilter";

import type { CoinMarketData } from "../types/AssetTableTypes";
// import type { AssetPriceTab, AssetTypes } from "../types/AssetTableTypes";
import PageContentWrapper from "../components/PageContentWrapper";
// import TabsBar from "../components/TabsBar";
// import useTabSwitch from "../hooks/useTabSwitch";


export default function AssetPricePage() {
    const data = useLoaderData<CoinMarketData[]>();
    const assetByCoingeckoId = Object.fromEntries(assets.map((asset) => [asset.coingeckoId, asset]));

    const { sortedData, requestSort, sortConfig } = useSortData(data, {
        name: (coin) => assetByCoingeckoId[coin.id]?.name ?? "",
        current_price: (coin) => coin.current_price,
        price_change_percentage_24h_in_currency: (coin) => coin.price_change_percentage_24h_in_currency,
        price_change_percentage_30d_in_currency: (coin) => coin.price_change_percentage_30d_in_currency,
    });

    const { visibleAssets, handleSearch } = useFilter<CoinMarketData>({ sortedData });
    // const { activeTab, handleTabSwitch } = useTabSwitch<AssetTypes, CoinMarketData>("All", visibleAssets, asset => asset.someFilteringTabsData);


    return (
        <>
            <PageHeader title="Asset Price List" />
            <PageContentWrapper>
                <SearchInput handleSearch={handleSearch} />
                {/* <TabsBar<AssetPriceTab> tabs={priceListTabs} activeTab={activeTab} handleTabSwitch={handleTabSwitch} /> */}
                <AssetTableHeader
                    name
                    last24hChange
                    last30dChange
                    price
                    currency
                    handleSort={requestSort}
                    sortConfig={sortConfig}
                    sortableKeys={[
                        "name",
                        "current_price",
                        "price_change_percentage_24h_in_currency",
                        "price_change_percentage_30d_in_currency",
                    ]}
                />
                {visibleAssets.map((coin) => {
                    const asset = assetByCoingeckoId[coin.id];
                    if (!asset) return null;

                    return <AssetTablePosition key={asset.name} asset={asset} dataFromCoingecko={visibleAssets} />;
                })}
            </PageContentWrapper>
        </>

    )
}

export function loader() {
    const assetIds = assets.map(asset => asset.coingeckoId).join(',');
    return fetchData(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetIds}&price_change_percentage=24h,30d&blockchain_site`, { method: 'GET', headers: { 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY } })
}