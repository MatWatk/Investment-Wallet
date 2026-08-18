import { useState } from "react";
import { useCurrency } from "./useCurrency";

type InputData = {
    name: string;
    currency: string;
};

export default function useInputField<T extends InputData>(defaultData?: T) {
    const currency = useCurrency();

    const [isInputInvalid, setIsInputInvalid] = useState<Record<string, boolean>>({});
    const [selectedAsset, setSelectedAsset] = useState<string>(defaultData?.name || 'Bitcoin');
    const [modalCurrency, setModalCurrency] = useState<string>(defaultData?.currency || currency);
    const currentDate = new Date().toISOString().split("T")[0];
    return {
        isInputInvalid,
        setIsInputInvalid,
        selectedAsset,
        setSelectedAsset,
        modalCurrency,
        setModalCurrency,
        currentDate,
    };
}