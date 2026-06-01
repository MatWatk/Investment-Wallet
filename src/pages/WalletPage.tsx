import AssetTableHeader from "../components/AssetTable/AssetTableHeader";
import AssetAddSection from "../components/WalletForm";
import { walletDummyData } from "../constants/assets";

import tableStyles from "../styles/tableStyles";
import AssetPositionName from "../components/AssetTable/AssetPositionName";
import { assets } from "../constants/assets";

export default function WalletPage() {

    return (
        <>
            <h1 className="text-2xl font-bold ">Your wallet</h1>
            <div className="w-full overflow-x-auto">
                <AssetTableHeader
                    name
                    amount
                    price
                    currency
                />
                {walletDummyData.map((asset, index) => (
                    <div key={index} className={tableStyles.tableRow}>
                        {assets.find(a => a.name === asset.name)?.image && (
                            <AssetPositionName name={asset.name} image={assets.find(a => a.name === asset.name)?.image || ""} />
                        )}
                        <div className="min-w-25 flex items-center gap-2">
                            <p className="mr-20">{asset.amount}</p>
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