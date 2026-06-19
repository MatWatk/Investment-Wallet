import { useDropdown } from "../../hooks/useDropdown";
import personImg from '../../assets/personImg.png'
import quitButton from '../../assets/quitButton.png'
import settingsIcon from '../../assets/settingsIcon.png'

import { useSelector } from "react-redux";

export default function ProfileButton() {
    const { isOpen: profileDropdownOpen, toggleDropdown: handleClickProfile, dropdownRef } = useDropdown();
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    return (
        <div className="relative flex flex-col justify-center ml-3 shrink-0 overflow-visible">
            <button onClick={handleClickProfile}>
                <img src={personImg} alt="Profile image" className="w-14 h-10 rounded-full" />
            </button>
            {profileDropdownOpen && (
                <div ref={dropdownRef} className={`absolute top-full right-0 mt-2 w-14 rounded-lg shadow-lg border py-2 z-50 ${themeState ? 'bg-white' : 'bg-gray-200'}`}>
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
    )
}