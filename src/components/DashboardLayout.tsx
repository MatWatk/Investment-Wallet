import NavBar from "../components/NavBar_components/NavBar";
import SideBar from "./SideBar_components/SideBar";
import { Outlet, useNavigation } from "react-router-dom";

import { useTheme } from "../hooks/useTheme";

export default function Layout() {
    const navigation = useNavigation();
    const themeState = useTheme();

    return (
        <div className={`flex h-screen w-full flex-col ${themeState ? "bg-linear-to-t from-violet-200 to-white" : "bg-linear-to-t from-gray-700 to-gray-900 text-yellow-500"}`}>
            <NavBar />

            <div className="flex flex-1 overflow-hidden">
                <SideBar />

                <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-6">
                    {navigation.state === "loading" && (
                            <p className={`${themeState ? "text-violet-400" : "text-yellow-400"} text-2xl flex items-center`}>Loading...</p>
                    )}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}