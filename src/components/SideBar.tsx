import { Outlet } from "react-router-dom";

export default function SideBar() {
    return (
        <>
        <div className="w-64 bg-gray-800 px-6 py-4 flex flex-1 rounded-r">
            <div className="h-full flex flex-col items-start justify-start gap-6 py-6">
                <div className="flex flex-col items-start gap-4 text-violet-200">
                    <button className="hover:text-violet-500 text-xl font-bold">
                        Your wallet
                    </button>
                    <button className="hover:text-violet-500 text-xl font-bold">
                        Check prices
                    </button>
                    <button className="hover:text-violet-500 text-xl font-bold">
                        Current prices
                    </button>
                </div>
            </div>
        </div>
        <Outlet />
        </>
    )
}