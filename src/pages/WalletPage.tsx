import AssetTableHeader from "../components/AssetTable/AssetTableHeader";
import AssetAddSection from "../components/WalletForm";
import { walletDummyData } from "../constants/assets";

import tableStyles from "../styles/tableStyles";
import AssetPositionName from "../components/AssetTable/AssetPositionName";
import { assets } from "../constants/assets";
import useSortData from "../hooks/useSortData";
import SearchInput from "../components/AssetTable/SearchInput";
import useFilter from "../hooks/useFilter";

export default function WalletPage() {
    const { sortedData, requestSort, sortConfig } = useSortData(walletDummyData, {
        name: (asset) => asset.name,
        amount: (asset) => asset.amount,
    });

    const { visibleAssets, handleSearch } = useFilter({ sortedData });

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Your Wallet</h1>
            <div className="w-full overflow-x-auto my-4">
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
            </div>
            <AssetAddSection />
        </>
    );
}