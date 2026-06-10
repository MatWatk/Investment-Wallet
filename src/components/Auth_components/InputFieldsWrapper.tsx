export default function InputFieldsWrapper({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-3">
            {children}
        </div>
    )
}