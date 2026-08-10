import RubbishBinIcon from "../../assets/rubbish_bin.png";

export default function RubbishBinButton({ onClick, ...props }: { onClick: () => void } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            onClick={onClick}
            className="font-bold rounded"
            {...props}
        >
            <img src={RubbishBinIcon} alt="Rubbish Bin" className="w-7 h-7" />
        </button>
    );
}