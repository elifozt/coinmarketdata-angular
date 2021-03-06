import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Globals {
    public symbols = ['', 'BTC', 'LTC', 'BCH', 'DOGE', 'ETH', 'ETC', 'XRP', 'XLM', 'XMR',
        'USDC', 'ZEC', 'BTG', 'DASH', 'BSV', 'TRX', 'ADA', 'QTUM', 'DCR', 'EOS', 'BTT']; // 'ZEN', 'BAT', 'DBG'
    public  coinmap = new Map([['BTC', 'Bitcoin'], ['ETH', 'Ethereum'], ['LTC', 'Litecoin'], ['XRP', 'Ripple'],
                                ['XLM', 'Stellar'], ['TRX', 'TRON'], ['BCHABC', 'Bitcoin Cash'], ['BCHSV', 'Bitcoin SV'],
                            ['ZEC', 'ZCash'], ['BNB', 'Binance Coin'], ['EOS', 'EOS'], ['WAVES', 'Waves']]);
    public  coinmapapi = new Map([['BTC', 'Bitcoin'], ['ETH', 'Ethereum'], ['LTC', 'Litecoin'], ['XRP', 'Ripple'],
                                ['XLM', 'Stellar'], ['TRX', 'TRON'], ['BCHABC', 'Bitcoin Cash ABC'], ['BCHSV', 'bitcoin-sv'],
                            ['ZEC', 'ZCash'], ['BNB', 'binance-coin'], ['EOS', 'EOS'], ['WAVES', 'Waves']]);
    getDateSec(time) {
        const date = new Date(time * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    getDate(time) {
        if (!time) { return null; }
        const date = new Date(time);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    /**
     * Function to sort alphabetically an array of objects by some specific key.
     * @param property Key of the object to sort.
     */
    public dynamicSort(property) {
            let sortOrder  = 1;

            if ( property[0] === '-') {
                sortOrder = -1;
                property = property.substr(1);
            }

            return function (a, b) {
                if (sortOrder === -1) {
                    return b[property] - (a[property]);
                } else {
                    return a[property] - (b[property]);
                }
            };
        }
}
