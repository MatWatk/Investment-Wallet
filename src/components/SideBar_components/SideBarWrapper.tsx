export default function SideBarWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[15%] min-w-55 bg-gray-800 py-4 rounded-r">
            <div className="h-full flex flex-col py-6">
                {children}
            </div>
        </div>

    )
}