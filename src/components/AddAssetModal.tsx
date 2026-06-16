import { useSelector } from "react-redux";

export default function AddAssetModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/80 p-4" onClick={onClose}>
            <div
                className={`w-full max-w-md max-h-[calc(100vh-3rem)] overflow-auto rounded-lg p-6 shadow-xl ${themeState ? "bg-white" : "bg-gray-700"}`}
                onClick={(event) => event.stopPropagation()}
            >
                <h2 className={`text-start font-bold ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Add Asset</h2>
                <form className="mt-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Asset Name</label>
                        <select className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 `}>
                            <option value="asset1">Asset 1</option>
                            <option value="asset2">Asset 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Amount</label>
                        <input type="number" className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 `} />
                    </div>
                    <div className="flex flex-row gap-4 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Price</label>
                            <input type="number" className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 `} />
                        </div>
                        <div className="flex flex-col gap-1 w-40">
                            <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Currency</label>
                            <select className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 `}>
                                <option value="usd">USD</option>
                                <option value="eur">EUR</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Asset Name</label>
                            <select className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 `}>
                                <option value="asset1">Platform 1</option>
                                <option value="asset2">Platform 2</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 w-40 py-2">
                            <button onClick={onClose} className={`mt-4 border-2 ${themeState ? "border-violet-900 text-violet-900 hover:bg-violet-100" : "border-gray-200 text-gray-200 bg-gray-800 hover:bg-gray-600"} rounded-lg  min-w-25 h-10`}>Add platform</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>Date</label>
                        <input type="date" className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 `} />
                    </div>
                    <div className="mt-4 flex flex-row gap-4 justify-evenly">
                        <button onClick={onClose} className={`mt-4 border-2 ${themeState ? "border-violet-900 text-violet-900 hover:bg-violet-100" : "border-gray-200 text-gray-200 bg-gray-800 hover:bg-gray-600"} rounded-lg min-w-25 h-10`}>Close</button>
                        <button onClick={onClose} className={`mt-4 border-2 ${themeState ? "border-violet-900 text-violet-900 hover:bg-violet-100" : "border-gray-200 text-gray-200 bg-gray-800 hover:bg-gray-600"} rounded-lg min-w-35 h-10`}>Add asset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}