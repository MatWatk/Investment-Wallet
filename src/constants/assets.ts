import goldBarIcon from '../assets/goldBarIcon.png'
import silverBarIcon from '../assets/silverBarIcon.png'

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

