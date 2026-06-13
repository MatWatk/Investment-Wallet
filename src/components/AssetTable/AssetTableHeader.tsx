import tablestyles from "../../styles/tableStyles";
import type { SortConfig } from "../../hooks/useSortData";

import SortingArrows from "./SortingArrows";

import { useSelector } from 'react-redux';

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

    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

    return (
        <>
            <div className={themeState ? tablestyles.light.tableHeader : tablestyles.dark.tableHeader}>
                {props.name &&
                <div className="ml-2 w-27 flex items-center whitespace-nowrap shrink-0">
                    <button onClick={() => handleSortClick("name" as SortKey)} disabled={!canSort("name" as SortKey)}>
                        <SortingArrows />
                    </button>
                    <p>Asset Name</p>
                </div>}
                 <div className="ml-auto flex items-center">
                {props.last24hChange && 
                <div className="mr-5 w-35 flex flex-row items-center justify-center gap-1 shrink-0">
                    <button onClick={() => handleSortClick("price_change_percentage_24h_in_currency" as SortKey)} disabled={!canSort("price_change_percentage_24h_in_currency" as SortKey)}>
                        <SortingArrows />
                    </button>
                <p className="text-center  w-12">Last 24h change</p>
                </div>}
                {props.last30dChange && 
                <div className="mr-2 w-32 flex flex-row items-center justify-center gap-1 shrink-0">
                    <button onClick={() => handleSortClick("price_change_percentage_30d_in_currency" as SortKey)} disabled={!canSort("price_change_percentage_30d_in_currency" as SortKey)}>
                        <SortingArrows />
                    </button>
                    <p className="text-center w-12">Last 30d change</p>
                </div>}
                {props.amount && 
                <div className="w-25 flex flex-row items-center justify-center gap-1 shrink-0">
                    <button onClick={() => handleSortClick("amount" as SortKey)} disabled={!canSort("amount" as SortKey)}>
                        <SortingArrows />
                    </button>
                <p className="text-right whitespace-nowrap">Amount</p>
                </div>}
                {props.price && 
                <div className="ml-8 w-25 flex flex-row items-center justify-center gap-1 shrink-0">
                    <button onClick={() => handleSortClick("current_price" as SortKey)} disabled={!canSort("current_price" as SortKey)}>
                        <SortingArrows />
                    </button>
                <p className="text-right whitespace-nowrap">Price</p>
                </div>}
                {props.currency && <p className="w-25 text-right shrink-0 whitespace-nowrap">Currency</p>}
            </div>
            </div>
        </>
    )
}