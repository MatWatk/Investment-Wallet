export default function AssetTablePosition({name, image}: {name: string, image: string}) {
    return (
        <div className="min-w-28 flex-1 flex items-center gap-2 whitespace-nowrap">
            <img src={image} alt={`${name} logo`} className="h-6 w-6 ml-3 shrink-0" />
            <p className="font-medium whitespace-nowrap">{name}</p>
        </div>
    )
}