import NavBar from "../components/NavBar_components/NavBar";
import SideBar from "./SideBar_components/SideBar";
import { Outlet, useLocation, useNavigation, useNavigate } from "react-router-dom";

import { useTheme } from "../hooks/useTheme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/config";
import { useEffect } from "react";

export default function Layout() {
    const navigation = useNavigation();
    const location = useLocation();
    const themeState = useTheme();
    const navigate = useNavigate();

    const isRouteTransitionLoading =
        navigation.state === "loading" &&
        !!navigation.location &&
        navigation.location.pathname !== location.pathname;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            }
            return () => unsubscribe();
        }
        )
    }, [navigate]);

    return (
        <div className={`flex h-screen w-full flex-col ${themeState ? "bg-linear-to-t from-violet-200 to-white" : "bg-linear-to-t from-gray-700 to-gray-900 text-yellow-500"}`}>
            <NavBar />

            <div className="flex flex-1 overflow-hidden">
                <SideBar />

                <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-6">
                    {isRouteTransitionLoading ? (
                        <div className="flex h-full min-h-56 items-center justify-center">
                            <p className={`${themeState ? "text-violet-400" : "text-yellow-400"} text-2xl`}>Loading...</p>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
        </div>
    );
}