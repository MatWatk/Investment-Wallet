import { useSelector } from "react-redux";
import type { SupportedLanguage } from "../types/types";

export function useLanguage(): SupportedLanguage {
    return useSelector((state: { language: { language: SupportedLanguage } }) => state.language.language);
}
