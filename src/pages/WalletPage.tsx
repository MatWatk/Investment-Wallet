import AssetTableHeader from "../components/AssetTable/AssetTableHeader";
import AssetPositionName from "../components/AssetTable/AssetPositionName";
import SearchInput from "../components/AssetTable/SearchInput";
import AssetAddSection from "../components/WalletForm";
import PageHeader from "../components/PageHeader";
import PageContentWrapper from "../components/PageContentWrapper";

import { walletDummyData } from "../constants/assets";
import { assets } from "../constants/assets";

import tableStyles from "../styles/tableStyles";

import useSortData from "../hooks/useSortData";
import useFilter from "../hooks/useFilter";

export default function WalletPage() {
    const { sortedData, requestSort, sortConfig } = useSortData(walletDummyData, {
        name: (asset) => asset.name,
        amount: (asset) => asset.amount,
    });

    const { visibleAssets, handleSearch } = useFilter({ sortedData });

    return (
        <>
            <PageHeader title="Your Wallet" />
            <PageContentWrapper>
                <SearchInput handleSearch={handleSearch} />
                <AssetTableHeader
                    name
                    amount
                    price
                    currency
                    handleSort={requestSort}
                    sortConfig={sortConfig}
                    sortableKeys={["name", "amount"]}
                />
                {visibleAssets.map((walletAsset) => (
                    <div key={walletAsset.name} className={tableStyles.tableRow}>
                        {assets.find(a => a.name === walletAsset.name)?.image && (
                            <AssetPositionName name={walletAsset.name} image={assets.find(a => a.name === walletAsset.name)?.image || ""} />
                        )}
                        <div className="min-w-25 flex items-center gap-2">
                            <p className="mr-20">{walletAsset.amount}</p>
                            <p className="mr-11 shrink-0">Price</p>
                            <p className="">Currency</p>
                        </div>
                    </div>
                ))}
            </PageContentWrapper>
            <AssetAddSection />
        </>
    );
}