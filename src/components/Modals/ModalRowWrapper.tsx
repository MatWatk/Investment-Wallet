export default function ModalRowWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row gap-4 w-full">
            {children}
        </div>
    )
}