export default function SelectInput({ label, selectOptions }: { label: string, selectOptions: string[] }) {
    return (
        <div className="flex flex-col -translate-y-2">
            <label htmlFor="language-select" className="text-violet-800 text-xs px-4 py-1">
                {label}
            </label>
            <select id="currency-select" defaultValue="USD" className="text-violet-900 hover:text-violet-700 bg-white px-2 py-1 rounded-md text-sm border border-rounded-md">
                {selectOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}