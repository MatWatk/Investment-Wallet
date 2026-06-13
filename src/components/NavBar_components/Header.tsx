import { useSelector } from 'react-redux';

export default function Header() {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    return (
        <div className="flex flex-col items-start gap-1 justify-start min-w-60">
            <h1 className={`text-2xl font-bold ${themeState ? "text-violet-900" : "text-yellow-500"}`}>
                Investment Wallet
            </h1>
            <p className={`text-sm ${themeState ? "text-violet-200" : "text-gray-600"} flex`}>
                by Matusz Watkowski
            </p>
        </div>
    )
}