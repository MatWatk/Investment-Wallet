import AssetAddSection from "../components/WalletForm";
import { walletDummyData } from "../constants/assets";
import tablestyles from "../styles/tableStyles";

export default function DashboardPage() {

    return (
        <>
            <h1 className="text-2xl font-bold ">Your wallet</h1>
            <div className={tablestyles.tableHeader}>
            </div>
            {walletDummyData.map((asset, index) => (
                <div key={index} className="flex flex-row items-center justify-start gap-2 rounded bg-violet-100 p-4 shadow">
                    <p>{asset.name}</p>
                    <p>{asset.amount}</p>
                </div>
            ))}
            <AssetAddSection />
        </>
    );
}