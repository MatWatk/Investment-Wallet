import { useTheme } from "../../hooks/useTheme";

export default function SubmitButton({ text, disabled }: { text: string, disabled?: boolean }) {
    const themeState = useTheme();
    return (
        <button disabled={disabled} type="submit" className={`rounded-md py-2 w-[70%] m-auto text-center ${themeState ? "bg-violet-900 text-white hover:bg-violet-800" : "bg-yellow-600 text-black hover:bg-yellow-700"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
            {text}
        </button>
    )
}