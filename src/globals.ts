import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Globals {
    // role: 'test';
    public symbols = ['', 'BTC', 'LTC', 'BCH', 'DOGE', 'ETH', 'ETC', 'XRP', 'XLM', 'XMR',
        'USDC', 'ZEC', 'BTG', 'DASH', 'BSV', 'TRX', 'ADA', 'QTUM', 'DCR', 'EOS', 'BTT']; // 'ZEN', 'BAT', 'DBG'

    getDateSec(time) {
        const date = new Date(time * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    getDate(time) {
        if (!time) { return null; }
        const date = new Date(time);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
}
