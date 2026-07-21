import OpenSidebar from "../../assets/openSidebar.png";

interface FoldingButtonProps {
    foldState: boolean;
    toggleFoldState: () => void;
}

export default function FoldingButton({ foldState, toggleFoldState }: FoldingButtonProps) {
    return (
        <button
            onClick={toggleFoldState}
            className={`flex items-center ${foldState ? 'justify-center' : 'justify-end'}`}>
            <img
                src={OpenSidebar}
                alt="Open Sidebar Icon"
                className={`flex w-8 h-8 mt-1 shrink-0 bg-gray-500 rounded-3xl p-1 hover:bg-gray-400 ${foldState ? '' : 'rotate-180'}`} />
        </button>
    );
}