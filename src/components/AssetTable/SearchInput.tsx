export default function SearchInput({ handleSearch }: { handleSearch: (query: string) => void }) {

    return (
        <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-900">Search</label>
            <input onChange ={(event => handleSearch(event.target.value))} type="text" id="search" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="Search for an asset..." />
        </div>
    )
}