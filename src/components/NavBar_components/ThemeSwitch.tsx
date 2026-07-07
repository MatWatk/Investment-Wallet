import SunIcon from "../../assets/sunIcon.png";
import MoonIcon from "../../assets/moonIcon.png";

import { translations } from "../../constants/translations";

import { useDispatch } from "react-redux";
import { themeActions } from "../../store/themeSlice";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";

export default function ThemeSwitch() {
    const dispatch = useDispatch();
    const themeState = useTheme();
    const language = useLanguage();

    const handleThemeChange = () => {
        dispatch(themeActions.toggleTheme());
    }
    return (
        <div className="flex flex-col -translate-y-1 items-center">
            <label htmlFor="theme-select" className="text-xs  ">
                {language === "english" ? translations.english.navBar.themeLabel : translations.polish.navBar.themeLabel}
            </label>
            <div className={`${themeState ? "" : "bg-gray-400"} rounded-full p-1`}>
                <button id="theme-select" onClick={handleThemeChange}>
                    <img src={themeState ? SunIcon : MoonIcon} alt="Theme switch icon" className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}