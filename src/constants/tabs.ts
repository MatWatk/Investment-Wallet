import type { AssetPriceTab } from "../types/AssetTableTypes"
import type { WalletTab } from "../types/WalletTypes"

export const marketTabs: WalletTab[] = [
    {
        name: 'Summary',
    },
    {
        name: 'Binance',
    },
    {
        name: 'Kanga',
    },
    {
        name: 'ByBit',
    },
    {
        name: 'Physical',
    },
]

export const priceListTabs: AssetPriceTab[] = [
    {
        name: 'All',
    },
    {
        name: 'Cryptocurrencies',
    },
    {
        name: 'Precious Metals',
    },
    {
        name: 'Stocks',
    },
]
