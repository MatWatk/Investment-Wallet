import {useSelector} from 'react-redux';

export default function SelectInput({ label, selectOptions }: { label: string, selectOptions: string[] }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

    return (
        <div className="flex flex-col -translate-y-2">
            <label htmlFor="language-select" className=" text-xs px-4 py-1">
                {label}
            </label>
            <select id="currency-select" defaultValue="USD" className={` ${themeState ? "bg-white text-violet-900" : "bg-gray-400 text-black "} px-2 py-1 rounded-md text-sm border border-rounded-md`}>
                {selectOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}