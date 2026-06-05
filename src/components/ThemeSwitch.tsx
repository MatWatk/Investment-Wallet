import { useState } from "react";
import SunIcon from "../assets/sunIcon.png";
import MoonIcon from "../assets/moonIcon.png";

export default function ThemeSwitch() {
    const [theme, setTheme] = useState("Light");

    const handleThemeChange = () => {
        setTheme((current) => (current === "Light" ? "Dark" : "Light"));
    }
    return (
        <div className="flex flex-col -translate-y-2 items-center">
            <label htmlFor="theme-select" className="text-violet-800 text-xs px-4 py-1">
                Theme
            </label>
            <button id="theme-select" onClick={handleThemeChange}>
                <img src={theme === "Light" ? SunIcon : MoonIcon} alt="Theme switch icon" className="w-6 h-6" />
            </button>
        </div>
    )
}