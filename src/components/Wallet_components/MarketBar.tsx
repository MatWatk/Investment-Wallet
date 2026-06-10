import { useState } from "react";

import { markets } from "../../constants/markets";

export default function MarketBar() {
    const [activeMarket, setActiveMarket] = useState("Summary");

    return (
        <div className={`flex items-center rounded border-b border-violet-400 w-full bg-violet-200 h-8 text-xs text-violet-900 font-bold shrink-0 gap-4 flex-row justify-evenly`}>
            {markets.map((market) => {
                const activeMarketClass = market.name === activeMarket ? "text-violet-800" : "text-gray-500";
                const handleMarketClick = () => {
                    setActiveMarket(market.name);
                }
                return (
                    <div key={market.name} className={`flex items-center justify-center w-full h-full ${ market.name === activeMarket ? "rounded-lg bg-linear-to-b from-violet-200 to-violet-300 " : ""}`}>
                        <button onClick={handleMarketClick} key={market.name} className={`w-full h-full text-sm mb-2 hover:text-violet-400 ${activeMarketClass}`}>{market.name}</button>
                    </div>
                )
            })}
        </div>
    )
}