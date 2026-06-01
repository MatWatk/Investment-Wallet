    export const formatPercent = (value: number | null | undefined) => {
        if (value == null) {
            return "-";
        }

        return `${value.toFixed(1)}%`;
    };