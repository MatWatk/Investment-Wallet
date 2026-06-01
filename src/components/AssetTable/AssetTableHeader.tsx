import tablestyles from "../../styles/tableStyles";
import sortingArrows from "../../assets/sortingArrows.png";

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
                {props.last24hChange && 
                <div className="w-20 flex flex-row items-center justify-center gap-1 ">
                    <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                <p className="text-center shrink-0 w-12">Last 24h change</p>
                </div>}
                {props.last30dChange && 
                <div className="w-30 flex flex-row items-center justify-center gap-1 ">
                    <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                    <p className="text-center shrink-0 w-12">Last 30d change</p>
                </div>}
                {props.amount && 
                <div className="w-10 flex flex-row items-center justify-center gap-1">
                    <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                <p className="text-right shrink-0 whitespace-nowrap">Amount</p>
                </div>}
                {props.price && 
                <div className="w-25 flex flex-row items-center justify-end gap-1">
                    <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                <p className="text-right whitespace-nowrap">Price</p>
                </div>}
                {props.currency && <p className="w-25 text-right shrink-0 whitespace-nowrap">Currency</p>}
            </div>
        </>
    )
}