export default function ModalHeader({ title, themeState }: { title: string; themeState: boolean }) {
    return (
        <h2 className={`text-start font-bold ${themeState ? "text-violet-900" : "text-yellow-500"}`}>{title}</h2>
    )
}