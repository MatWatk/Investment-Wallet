import { translations } from "../constants/translations";
import { useLanguage } from "../hooks/useLanguage";


export default function RouterError({ type }: { type: keyof typeof translations.english.routerErrors }) {
    const language = useLanguage();
    return <div>{translations[language].routerErrors[type]}</div>;
}