import { useTheme } from "../../hooks/useTheme";
import buttonStyles from "../../styles/buttonStyles";

export default function AssetAddButton({ children, onClick }: { children?: React.ReactNode, onClick: () => void }) {
    const themeState = useTheme();
    return (
        <button type="button" onClick={onClick} className={`${themeState ? buttonStyles.lightTheme.customButton : buttonStyles.darkTheme.customButton} flex items-center justify-center h-10 px-6`}>{children}</button>
    )
}