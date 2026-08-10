export default function AssetPositionName({name, image, earnOrLossValue, ...props}: {name: string, image: string, earnOrLossValue?: string} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="min-w-28 flex-1 flex items-center gap-2 whitespace-nowrap" {...props}>
            <img src={image} alt={`${name} logo`} className="h-6 w-6 ml-3 shrink-0" />
            <p className="font-medium whitespace-nowrap">{name}</p>
            <p className={`${earnOrLossValue?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{earnOrLossValue}</p>
        </div>
    )
}