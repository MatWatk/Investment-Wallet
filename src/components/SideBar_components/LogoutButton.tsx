import { useSelector } from "react-redux";
import { translations } from "../../constants/translations";

export default function LogoutButton() {
    const language = useSelector((state: { language: { language: string } }) => state.language.language);
    return (
        <div className="flex flex-col mt-auto text-violet-200 items-center w-full">
            <button className="bg-gray-600 text-violet-200 text-xl font-bold hover:text-yellow-500 hover:bg-gray-700 w-3/4 py-2 rounded text-center">
                {language.toLowerCase() === "english" ? translations.english.sideBar.logout : translations.polish.sideBar.logout}
            </button>
        </div>
    )
}