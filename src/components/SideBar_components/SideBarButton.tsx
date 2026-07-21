import { NavLink } from "react-router-dom";

export default function SideBarButton({ children, link, icon, altText, isFolded }: { children: React.ReactNode, link: string, icon?: string, altText?: string, isFolded?: boolean }) {
    return (
        <NavLink
            to={link}
            className={({ isActive }) =>
                `group py-2 text-xl font-bold transition-colors flex w-full ${isFolded ? "justify-center" : "items-center px-3"} ${
                    isActive
                        ? "text-yellow-500"
                        : "text-violet-200 hover:text-yellow-400"
                }`
            }
            end>
            {({ isActive }) => (
                <div className={`flex w-full ${isFolded ? "justify-center" : "items-center gap-2"}`}>
                    {icon && (
                        <span
                            className={`rounded-md p-1 transition-colors ${
                                isActive ? "bg-yellow-500" : "bg-gray-400 group-hover:bg-yellow-400"
                            }`}>
                            <img
                                src={icon}
                                alt={altText || "Icon"}
                                className="w-5 h-5 shrink-0"
                            />
                        </span>
                    )}
                    {!isFolded && <span className="whitespace-nowrap">{children}</span>}
                </div>
            )}
        </NavLink>
    )
}