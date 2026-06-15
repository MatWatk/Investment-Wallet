export default function PageContentWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-w-0 mt-4 overflow-x-auto overflow-y-visible">
            <div className="inline-block min-w-full align-top">
                {children}
            </div>
        </div>
    )
}