export default function ModalSelect({ themeState, labelText, options, name, defaultValue, disabled }: { themeState: boolean, labelText: string, options: { value: string, label: string }[], name: string, defaultValue?: string, disabled?: boolean }) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>{labelText}</label>
            <select name={name} defaultValue={defaultValue} disabled={disabled} className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}