export default function ModalInput({themeState, labelText, inputType="text", defaultValue}: {themeState: boolean, labelText: string, inputType?: "text" | "number" | "date", defaultValue?: string}) {
    return (
        <div className="flex flex-col gap-1 min-w-68">
            <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>{labelText}</label>
            <input type={inputType} defaultValue={defaultValue} className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 `} />
        </div>
    )
}