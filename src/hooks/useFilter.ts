import { useMemo, useState } from "react";

export default function useFilter<T extends {id: string} | {name: string}>({ sortedData }: { sortedData: T[] }) {
    const [query, setQuery] = useState("");

    const visibleAssets = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return sortedData;

        return sortedData.filter((asset) => {
            if ("id" in asset) {
                return asset.id.toLowerCase().includes(normalizedQuery);
            } else if ("name" in asset) {
                return asset.name.toLowerCase().includes(normalizedQuery);
            }
            return false;
        });
    }, [sortedData, query]);

    const handleSearch = (query: string) => {
        setQuery(query);
    }

    return { visibleAssets, handleSearch };
}