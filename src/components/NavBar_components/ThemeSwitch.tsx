import SunIcon from "../../assets/sunIcon.png";
import MoonIcon from "../../assets/moonIcon.png";

import { translations } from "../../constants/translations";

import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/themeSlice";

export default function ThemeSwitch() {
    const dispatch = useDispatch();
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    const language = useSelector((state: { language: { language: string } }) => state.language.language);

    const handleThemeChange = () => {
        dispatch(themeActions.toggleTheme());
    }
    return (
        <div className="flex flex-col -translate-y-1 items-center">
            <label htmlFor="theme-select" className="text-xs  ">
                {language.toLowerCase() === "english" ? translations.english.navBar.themeLabel : translations.polish.navBar.themeLabel}
            </label>
            <div className={`${themeState ? "" : "bg-gray-400"} rounded-full p-1`}>
                <button id="theme-select" onClick={handleThemeChange}>
                    <img src={themeState ? SunIcon : MoonIcon} alt="Theme switch icon" className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}