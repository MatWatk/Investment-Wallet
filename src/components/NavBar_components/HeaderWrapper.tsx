export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-20 bg-white shadow px-6">
            <div className="h-full flex items-center">
                {children}
            </div>
        </div>

    )
}