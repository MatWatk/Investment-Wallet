import personImg from '../assets/personImg.png'
import quitButton from '../assets/quitButton.png'
import settingsIcon from '../assets/settingsIcon.png'
import { useDropdown } from "../hooks/useDropdown";

export default function NavBar() {
    const { isOpen: profileDropdownOpen, toggleDropdown: handleClickProfile, dropdownRef } = useDropdown();

    return (
        <div className="w-full h-20 bg-white shadow px-6">
            <div className="h-full flex items-center">
                <div className="flex flex-col items-start gap-1 justify-start">
                    <h1 className="text-2xl font-bold text-violet-900">
                        Investment Wallet
                    </h1>
                    <p className="text-sm text-violet-200 flex">
                        by Matusz Watkowski
                    </p>
                </div>
                <div className="flex items-center ml-auto gap-4">
                    <div className="flex flex-col -translate-y-2">
                        <label htmlFor="language-select" className="text-violet-800 text-xs px-4 py-1">
                            Currency
                        </label>
                        <select id="currency-select" defaultValue="USD" className="text-violet-900 hover:text-violet-700 bg-white px-2 py-1 rounded-md text-sm border border-rounded-md">
                            <option>USD</option>
                            <option>PLN</option>
                        </select>
                    </div>
                    <div className="flex flex-col -translate-y-2">
                        <label htmlFor="language-select" className="text-violet-800 text-xs px-4 py-1">
                            Language
                        </label>
                        <select id="language-select" defaultValue="English" className="text-violet-900 hover:text-violet-700 bg-white px-2 py-1 rounded-md text-sm border border-rounded-md">
                            <option>English</option>
                            <option>Polish</option>
                        </select>
                    </div>
                    <div className="relative flex flex-col items-center justify-center ml-6">
                        <button onClick={handleClickProfile}>
                            <img src={personImg} alt="Profile image" className="w-14 h-10 rounded-full ml-6" />
                        </button>
                        {profileDropdownOpen && (
                            <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-14 bg-white rounded-lg shadow-lg border py-2 z-50 ">
                                <button
                                    className="w-full flex items-center justify-center py-3"
                                >
                                    <img src={settingsIcon} alt="Settings button" className="w-6 h-6 " />
                                </button>

                                <button
                                    className="w-full flex items-center justify-center py-3"
                                >
                                    <img src={quitButton} alt="Logout button" className="w-6 h-6 " />
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}