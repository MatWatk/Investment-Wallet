import RubbishBinIcon from "../../assets/rubbish_bin.png";

export default function RubbishBinButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="font-bold py-2 px-4 rounded"
        >
            <img src={RubbishBinIcon} alt="Rubbish Bin" className="w-7 h-7" />
        </button>
    );
}