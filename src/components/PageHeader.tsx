export default function PageHeader({ title = "Asset Price List" }: { title?: string }) {
    return (
        <h1 className="text-2xl font-bold">{title}</h1>
    )
}