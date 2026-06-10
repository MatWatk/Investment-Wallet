export default function PageContentWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full overflow-x-auto my-4">
            {children}
        </div>
    )
}