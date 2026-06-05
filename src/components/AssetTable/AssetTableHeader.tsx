import tablestyles from "../../styles/tableStyles";
import sortingArrows from "../../assets/sortingArrows.png";
import type { SortConfig } from "../../hooks/useSortData";

interface AssetTableHeaderProps<SortKey extends string = string> {
    name: boolean;
    last24hChange?: boolean;
    last30dChange?: boolean;
    price?: boolean;
    currency?: boolean;
    amount?: boolean;
    handleSort?: (key: SortKey) => void;
    sortConfig?: SortConfig<SortKey> | null;
    sortableKeys?: SortKey[];
}

export default function AssetTableHeader<SortKey extends string = string>({ ...props }: AssetTableHeaderProps<SortKey>) {
    const canSort = (key: SortKey) => !!props.handleSort && props.sortableKeys?.includes(key);
    const handleSortClick = (key: SortKey) => {
        if (!canSort(key)) return;
        props.handleSort?.(key);
    };

    return (
        <>
            <div className={tablestyles.tableHeader}>
                {props.name &&
                <div className="min-w-25 flex-1 flex items-center whitespace-nowrap">
                    <button onClick={() => handleSortClick("name" as SortKey)} disabled={!canSort("name" as SortKey)}>
                        <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                    </button>
                    <p>Asset Name</p>
                </div>}
                {props.last24hChange && 
                <div className="w-20 flex flex-row items-center justify-center gap-1 shrink-0">
                    <button onClick={() => handleSortClick("price_change_percentage_24h_in_currency" as SortKey)} disabled={!canSort("price_change_percentage_24h_in_currency" as SortKey)}>
                    <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                    </button>
                <p className="text-center  w-12">Last 24h change</p>
                </div>}
                {props.last30dChange && 
                <div className="w-30 flex flex-row items-center justify-center gap-1 shrink-0">
                    <button onClick={() => handleSortClick("price_change_percentage_30d_in_currency" as SortKey)} disabled={!canSort("price_change_percentage_30d_in_currency" as SortKey)}>
                    <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                    </button>
                    <p className="text-center w-12">Last 30d change</p>
                </div>}
                {props.amount && 
                <div className="w-16 flex flex-row items-center justify-center gap-1 shrink-0">
                    <button onClick={() => handleSortClick("amount" as SortKey)} disabled={!canSort("amount" as SortKey)}>
                    <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                    </button>
                <p className="text-right whitespace-nowrap">Amount</p>
                </div>}
                {props.price && 
                <div className="w-25 flex flex-row items-center justify-end gap-1 shrink-0">
                    <button onClick={() => handleSortClick("current_price" as SortKey)} disabled={!canSort("current_price" as SortKey)}>
                    <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 inline-block mr-1" />
                    </button>
                <p className="text-right whitespace-nowrap">Price</p>
                </div>}
                {props.currency && <p className="w-25 text-right shrink-0 whitespace-nowrap">Currency</p>}
            </div>
        </>
    )
}