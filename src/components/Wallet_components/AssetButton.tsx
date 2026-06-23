import { useTheme } from "../../hooks/useTheme";
import buttonStyles from "../../styles/buttonStyles";

export default function AssetButton({ children, onClick, big=true }: { children?: React.ReactNode, onClick: () => void, big?: boolean }) {
    const themeState = useTheme();
    return (
        <button type="button" onClick={onClick} className={`${themeState ? buttonStyles.lightTheme.customButton : buttonStyles.darkTheme.customButton} flex items-center justify-center ${big ? "h-12 px-6" : "h-8 px-4"}`}>{children}</button>
    )
}