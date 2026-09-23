import AssetTableHeader from "../../components/AssetTable/AssetTableHeader";
import AssetTablePosition from "../../components/AssetTable/AssetTablePosition";
import SearchInput from "../../components/AssetTable/SearchInput";
import PageHeader from "../../components/PageHeader";

import useRevalidatePage from "../../hooks/useRevalidatePage";

import { assets } from "../../constants/assets";
// import { priceListTabs } from "../constants/tabs";

import useSortData from "../../hooks/useSortData";
import useFilter from "../../hooks/useFilter";

import type { CoinMarketData } from "../../types/AssetTableTypes";
// import type { AssetPriceTab, AssetTypes } from "../types/AssetTableTypes";
import PageContentWrapper from "../../components/PageContentWrapper";
// import TabsBar from "../components/TabsBar";
// import useTabSwitch from "../hooks/useTabSwitch";

import { useCurrency } from "../../hooks/useCurrency";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import { useQuery } from "@tanstack/react-query";
import loadAssetPrices from "../../services/api/loadAssetPrices";


export default function AssetPricePage() {
    const currency = useCurrency();
    const language = useLanguage();

    useRevalidatePage(currency);

    const {data, isError, isPending, error} = useQuery({
        queryKey: ["assetPrices", {assets, currency}],
        queryFn: async () => await loadAssetPrices<{ coingeckoId: string }[]>({ assets, currency }),
        gcTime: 5 * 60 * 1000,
        staleTime: 60000,
    });

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
            <PageHeader title={translations[language].assetPricePage.title} />
            <PageContentWrapper>
                <SearchInput
                    handleSearch={handleSearch}
                    label={translations[language].walletPage.searchbarLabel}
                    placeholder={translations[language].walletPage.searchbarPlaceholder} />
                {/* <TabsBar<AssetPriceTab> tabs={priceListTabs} activeTab={activeTab} handleTabSwitch={handleTabSwitch} /> */}
                <AssetTableHeader
                    last24hChange
                    last30dChange
                    value
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
                {!isPending && !isError && visibleAssets.map((coin) => {
                    const asset = assetByCoingeckoId[coin.id];
                    if (!asset) return null;

                    return <AssetTablePosition key={asset.name} asset={asset} dataFromCoingecko={visibleAssets} />;
                })}
                {isPending && <p className='flex items-center justify-center p-5'>Loading...</p>}
                {isError && <p className='flex items-center justify-center p-5 text-red-500'>Error: {error?.message}</p>}
            </PageContentWrapper>
        </>

    )
}