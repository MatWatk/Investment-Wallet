import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function DashboardLayout() {
    return (
        <div className="flex flex-col h-screen w-full bg-linear-to-t from-violet-200 to-white">
            <NavBar />
            <SideBar />

        </div>
    )
}