import sortingArrows from "../../assets/sortingArrows.png";

import { useSelector } from "react-redux";

export default function SortingArrows() {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    return (
        <div className={`${themeState ? "" : "bg-gray-500"} rounded-sm p-0.5 flex items-center justify-center w-4 h-4`}>
            <img src={sortingArrows} alt="Sorting arrows" className="h-3 w-2 block" />
        </div>
    )
}