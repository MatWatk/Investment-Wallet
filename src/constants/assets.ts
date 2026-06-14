import goldBarIcon from '../assets/goldBarIcon.png'
import silverBarIcon from '../assets/silverBarIcon.png'
import type { WalletAsset } from '../types/WalletTypes';

export interface Asset {
    name: string;
    symbol: string;
    coingeckoId: string;
    image: string;
}

export const assets: Asset[] = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        coingeckoId: 'bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        coingeckoId: 'ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    },
    {
        name: 'Gold',
        symbol: 'XAU',
        coingeckoId: 'pax-gold',
        image: goldBarIcon,
    },
    {
        name: 'Silver',
        symbol: 'XAG',
        coingeckoId: 'kinesis-silver',
        image: silverBarIcon,
    },
];


export const walletDummyData: WalletAsset[] = [
    { name: 'Bitcoin', amount: 0.51, market: "Binance" },
    { name: 'Bitcoin', amount: 0.1, market: "Kanga" },
    { name: 'Ethereum', amount: 2, market: "Kanga" },
    { name: 'Gold', amount: 10, market: "Physical" },
    { name: 'Silver', amount: 100, market: "Physical" },
];