import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    
    return (
        <div className="flex h-screen w-full flex-col bg-linear-to-t from-violet-200 to-white">
            <NavBar />

            <div className="flex flex-1 overflow-hidden">
                <SideBar />

                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}