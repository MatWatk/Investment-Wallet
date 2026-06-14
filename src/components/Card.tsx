import { useSelector } from "react-redux";
import { translations } from "../constants/translations";
import SelectInput from "../components/NavBar_components/SelectInput";
import ThemeSwitch from "./NavBar_components/ThemeSwitch";

export default function Card({ children }: { children: React.ReactNode }) {
    const language = useSelector((state: { language: { language: keyof typeof translations } }) => state.language.language);
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    return (
        <>
            <div className={`relative min-h-screen w-full ${themeState ? "text-violet-900 border-violet-900 bg-linear-to-l from-violet-300 to-white" : "bg-linear-to-t from-gray-700 to-gray-900 text-yellow-500"} flex flex-col items-center justify-center`}>
                <div className="absolute top-4 right-4 flex flex-row items-center gap-4">
                    <SelectInput
                        label="Language"
                        selectOptions={translations[language].navBar.languages}
                        selectValues={["english", "polish"]} />
                    <ThemeSwitch />
                </div>
                <div className={`p-8 rounded-md shadow-md flex flex-col items-center gap-6 min-w-[25%] ${themeState ? "bg-violet-100 border-violet-900" : "bg-gray-700 text-yellow-600"}`}>
                    {children}
                </div>
            </div >
        </>
    )
}