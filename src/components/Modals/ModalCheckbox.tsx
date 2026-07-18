export default function ModalCheckbox({ themeState, labelText, name, defaultChecked, setChecked }: { themeState: boolean, labelText: string, name?: string, defaultChecked?: boolean, setChecked: (checked: boolean) => void }) {
    return (
        <div className="flex items-center gap-2">
            <input 
            type="checkbox" 
            name={name} 
            defaultChecked={defaultChecked} 
            onChange={(e) => setChecked(e.target.checked)} 
            className={`w-4 h-4 rounded ${themeState ? "text-violet-600" : "text-yellow-500"} focus:ring-2 focus:ring-offset-0 focus:outline-none`} />
            <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>{labelText}</label>
        </div>
    )
}