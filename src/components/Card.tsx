export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-linear-to-l from-violet-300 to-white flex flex-col items-center justify-center">
            <div className="bg-violet-100 p-8 rounded-md shadow-md flex flex-col items-center gap-6 min-w-[25%]">
                {children}
            </div>
        </div>
    )
}