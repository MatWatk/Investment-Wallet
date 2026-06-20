import { useTheme } from "../../hooks/useTheme";

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
    const themeState = useTheme();

    return (
        <div className={`w-full px-6 py-3 ${themeState ? "bg-white shadow" : "bg-gray-900 text-yellow-500"}`}>
            <div className="w-full flex min-w-0 items-center gap-4">
                {children}
            </div>
        </div>

    )
}