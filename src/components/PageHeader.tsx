export default function PageHeader({ title }: { title: string }) {
    return (
        <h1 className="text-2xl font-bold mb-5">{title}</h1>
    )
}