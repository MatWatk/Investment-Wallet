import { NavLink, Outlet } from "react-router-dom";

export default function SideBar() {
    return (
        <>
            <div className="w-[15%] bg-gray-800 py-4 flex flex-1 rounded-r">
                <div className="h-full flex flex-col py-6">
                    <div className="flex flex-col gap-4 text-violet-200 px-6">
                        <NavLink to='/' className={({ isActive }) => isActive ? "text-yellow-500 text-xl font-bold" : "text-violet-200 text-xl font-bold hover:text-violet-500"} end>
                            Your wallet
                        </NavLink>
                        <NavLink to='/assets-price-list' className={({ isActive }) => isActive ? "text-yellow-500 text-xl font-bold" : "text-violet-200 text-xl font-bold hover:text-violet-500"} end>
                            Asset price list
                        </NavLink>
                        <NavLink to='/current-prices' className={({ isActive }) => isActive ? "text-yellow-500 text-xl font-bold" : "text-violet-200 text-xl font-bold hover:text-violet-500"} end>
                            Some placeholder
                        </NavLink>
                    </div>
                    <div className="flex flex-col mt-auto text-violet-200 items-center w-full">
                        <button className="bg-gray-600 text-violet-200 text-xl font-bold hover:text-yellow-500 hover:bg-gray-700 w-3/4 py-2 rounded text-center">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}