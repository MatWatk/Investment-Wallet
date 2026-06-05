export default function SideButtonsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 text-violet-200 px-6">
            {children}
        </div>
    )
}