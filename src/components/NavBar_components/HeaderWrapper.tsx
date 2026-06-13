import { useSelector } from "react-redux";


export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

    return (
        <div className={`w-full h-20  px-6 ${themeState ? "bg-white shadow" : "bg-gray-900 text-yellow-500"}`}>
            <div className="h-full flex items-center">
                {children}
            </div>
        </div>

    )
}