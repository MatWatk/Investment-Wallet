import tablestyles from "../../styles/tableStyles";

interface AssetTableHeaderProps {
    name: boolean;
    last24hChange?: boolean;
    last30dChange?: boolean;
    price?: boolean;
    currency?: boolean;
    amount?: boolean;
}

export default function AssetTableHeader({ ...props }: AssetTableHeaderProps) {
    return (
        <>
            <div className={tablestyles.tableHeader}>
                <p className="min-w-25 flex-1 whitespace-nowrap">Asset Name</p>
                {props.last24hChange && <p className="w-25 text-center shrink-0">Last 24h change</p>}
                {props.last30dChange && <p className="w-25 text-center shrink-0">Last 30d change</p>}
                {props.amount && <p className="w-25 text-right shrink-0 whitespace-nowrap">Amount</p>}
                {props.price && <p className="w-25 shrink-0 text-right whitespace-nowrap">Price</p>}
                {props.currency && <p className="w-25 text-right shrink-0 whitespace-nowrap">Currency</p>}
            </div>
        </>
    )
}