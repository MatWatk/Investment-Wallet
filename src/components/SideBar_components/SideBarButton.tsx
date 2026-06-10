import { NavLink } from "react-router-dom";

export default function SideBarButton({ children, link }: { children: React.ReactNode, link: string }) {
    return (
        <NavLink to={link} className={({ isActive }) => isActive ? "text-yellow-500 text-xl font-bold" : "text-violet-200 text-xl font-bold hover:text-violet-500"} end>
            {children}
        </NavLink>
    )
}