import { useMemo, useState } from "react";

export type SortDirection = "ascending" | "descending";

export interface SortConfig<Key extends string> {
    key: Key;
    direction: SortDirection;
}

type SortValue = string | number | null | undefined;
type SortAccessors<Data, Key extends string> = Record<Key, (item: Data) => SortValue>;


function compareValues(a: SortValue, b: SortValue): number {
    const left = a ?? "";
    const right = b ?? "";

    if (typeof left === "number" && typeof right === "number") {
        return left - right;
    }

    return String(left).localeCompare(String(right), undefined, {
        numeric: true,
        sensitivity: "base",
    });
}

export default function useSortData<Data, Key extends string>(
    data: Data[],
    accessors: SortAccessors<Data, Key>
) {
    const [sortConfig, setSortConfig] = useState<SortConfig<Key> | null>(null);

    const sortedData = useMemo(() => {
        if (!sortConfig) return data;

        const accessor = accessors[sortConfig.key];
        if (!accessor) return data;

        return [...data].sort((a, b) => {
            const result = compareValues(accessor(a), accessor(b));
            return sortConfig.direction === "ascending" ? result : -result;
        });
    }, [data, accessors, sortConfig]);

    const requestSort = (key: Key) => {
        setSortConfig((current) => {
            if (!current || current.key !== key) {
                return { key, direction: "ascending" };
            }

            return {
                key,
                direction: current.direction === "ascending" ? "descending" : "ascending",
            };
        });
    };

    return { sortedData, requestSort, sortConfig };
}
