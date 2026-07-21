import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import useLogout from "../../hooks/useLogout";

import QuitIcon from "../../assets/quitButton.png";

export default function LogoutButton({ foldState }: { foldState: boolean }) {
    const language = useLanguage();

    const { logoutError, handleLogout } = useLogout();

    return (
        <div className={`flex flex-col mt-auto text-violet-200 items-center ${foldState ? 'w-full' : ''}`}>
            <button
                className="bg-gray-600 text-violet-200 text-xl font-bold hover:text-yellow-500 hover:bg-gray-700 w-3/4 py-2 rounded text-center flex items-center justify-center gap-2"
                onClick={handleLogout}>
                <img src={QuitIcon} alt="Quit Icon" className="w-5 h-5 mt-1 shrink-0" />
                {foldState ? '' : (language === "english" ? translations.english.sideBar.logout : translations.polish.sideBar.logout)}
            </button>
            {logoutError && (
                <div className="text-red-500 text-center mt-2">{logoutError}</div>
            )}
        </div>
    )
}