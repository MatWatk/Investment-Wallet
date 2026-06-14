import { useSelector } from "react-redux";

export default function SubmitButton({ text }: { text: string }) {
    const themeState = useSelector((state: { theme: { lightTheme: boolean } }) => state.theme.lightTheme);
    return (
        <button className={`rounded-md py-2 w-[70%] m-auto text-center ${themeState ? "bg-violet-900 text-white hover:bg-violet-800" : "bg-yellow-600 text-black hover:bg-yellow-700"}`}>
            {text}
        </button>
    )
}