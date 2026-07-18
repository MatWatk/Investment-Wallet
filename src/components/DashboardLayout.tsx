import NavBar from "../components/NavBar_components/NavBar";
import SideBar from "./SideBar_components/SideBar";
import { Outlet, useNavigation, useNavigate } from "react-router-dom";

import { useTheme } from "../hooks/useTheme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/config";
import { useEffect } from "react";

export default function Layout() {
    const navigation = useNavigation();
    const themeState = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            }
            return () => unsubscribe();
        }
        )
    }, [navigate]);

    if (navigation.state === "loading") {
        return (
            <div className={`flex h-screen w-full flex-col ${themeState ? "bg-linear-to-t from-violet-200 to-white" : "bg-linear-to-t from-gray-700 to-gray-900 text-yellow-500"}`}>
                <NavBar />
                <div className="flex flex-1 overflow-hidden">
                    <SideBar />
                    <main className="flex flex-1 min-w-0 items-center justify-center overflow-y-auto overflow-x-hidden p-6">
                        <p className={`${themeState ? "text-violet-400" : "text-yellow-400"} text-2xl`}>Loading...</p>
                    </main>
                </div>
            </div>
        );
    }

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