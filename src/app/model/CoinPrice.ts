export class CoinPrice {
    symbol: string;
    name?: string;
    lastPrice: number;
    bidPrice?: string;
    askPrice?: string;
    addTime: string;
    volume: number;
    change?: string;
    changeImg?; string;
}

export class ChartPriceElement {
    addTime: string;
    lastPrice: number;
}
