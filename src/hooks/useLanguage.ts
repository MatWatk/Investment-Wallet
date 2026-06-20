import { useSelector } from "react-redux";
import { translations } from "../constants/translations";

export function useLanguage() {
    return useSelector((state: { language: { language: keyof typeof translations } }) => state.language.language);
}
