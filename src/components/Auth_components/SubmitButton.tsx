export default function SubmitButton({ text }: { text: string }) {
    return (
        <button className="rounded-md bg-violet-900 py-2 text-white w-[70%] m-auto text-center">
            {text}
        </button>
    )
}