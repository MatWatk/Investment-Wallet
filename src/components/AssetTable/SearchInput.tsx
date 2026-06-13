import { useSelector } from 'react-redux';

export default function SearchInput({ handleSearch }: { handleSearch: (query: string) => void }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);

    return (
        <div>
            <label htmlFor="search" className={`block text-sm font-medium ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Search</label>
            <input onChange ={(event => handleSearch(event.target.value))} type="text" id="search" className={`mb-4 ${themeState ? "bg-white text-violet-900 border border-gray-300" : "bg-gray-600 text-yellow-500 border border-gray-400 focus:outline-none"} text-sm rounded-lg w-full p-2.5`} placeholder="Search for an asset..." />
        </div>
    )
}