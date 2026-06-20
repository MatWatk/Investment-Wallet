import { useSelector } from "react-redux";
import type { currencyType } from "../types/types";

export function useCurrency() {
    return useSelector((state: { currency: { currency: currencyType } }) => state.currency.currency);
}
