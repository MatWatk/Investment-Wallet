interface SideBarWrapperProps {
    children: React.ReactNode;
    foldState: boolean;
}

export default function SideBarWrapper({ children, foldState }: SideBarWrapperProps) {
    return (
        <div className={` bg-gray-800 py-4 rounded-r ${foldState ? 'w-[7%] min-w-10' : 'w-[17%] min-w-55'}`}>
            <div className="h-full flex flex-col py-6">
                {children}
            </div>
        </div>

    )
}