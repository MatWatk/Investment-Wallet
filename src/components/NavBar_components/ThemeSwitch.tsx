import SunIcon from "../../assets/sunIcon.png";
import MoonIcon from "../../assets/moonIcon.png";

import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/themeSlice";

export default function ThemeSwitch() {
    const dispatch = useDispatch();
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

    const handleThemeChange = () => {
        dispatch(themeActions.toggleTheme());
    }
    return (
        <div className="flex flex-col -translate-y-2 items-center">
            <label htmlFor="theme-select" className="text-violet-800 text-xs  py-1">
                Theme
            </label>
            <button id="theme-select" onClick={handleThemeChange}>
                <img src={themeState ? SunIcon : MoonIcon} alt="Theme switch icon" className="w-6 h-6" />
            </button>
        </div>
    )
}