import NavBar from "../components/NavBar_components/NavBar";
import SideBar from "./SideBar_components/SideBar";
import { Outlet } from "react-router-dom";

import {  useSelector } from "react-redux";

export default function Layout() {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

    return (
        <div className={`flex h-screen w-full flex-col ${themeState ? "bg-linear-to-t from-violet-200 to-white" : "bg-linear-to-t from-gray-700 to-gray-900 text-yellow-500"}`}>
            <NavBar />

            <div className="flex flex-1 overflow-hidden">
                <SideBar />

                <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}