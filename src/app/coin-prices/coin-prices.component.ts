import { Component, OnInit, OnDestroy } from '@angular/core';
import { PriceService } from '../../service/price.service';
import { CoinPrice } from '../CoinPrice';
import { MatTableDataSource } from '@angular/material';
import { Globals } from '../../globals';
import { trigger, state, style, transition, animate, query } from '@angular/animations';
// import '../../../node_modules/cryptocurrency-icons';

@Component({
  selector: 'app-coin-prices',
  templateUrl: './coin-prices.component.html',
  animations: [
    trigger('rowAnimation', [
      state('increased', style({
        backgroundColor: 'rgb(5,176,104)',
        color: 'black'
      })),
      state('decreased', style({
        backgroundColor: 'rgb(255,58,48)',
        color: 'black'
      })),
      state('unchanged',   style({
        backgroundColor: 'whitesmoke',
        color: 'black'
      })),
      transition('void => *', animate('5000ms ease-in'))
    ])
  ],
  styleUrls: ['./coin-prices.component.css']
})
export class CoinPricesComponent implements OnInit, OnDestroy {
  cp: Array<CoinPrice> = new Array<CoinPrice>();
  dataSource = new MatTableDataSource<CoinPrice>();
  displayedColumns: string[] = ['index', 'symbol', 'lastPrice', 'volume'];
  map = new Map<string, CoinPrice>();
  constructor(private priceService: PriceService, private globals: Globals) {
    priceService.messages.subscribe(coinprices => {
      if (coinprices != null && coinprices.length !== 0) {
        console.log('New prices updated');
        coinprices.forEach(coin => {
          coin.addTime = this.globals.getDate(coin.addTime);
          const oldCoin = this.map.get(coin.symbol);
          // coin.increased = false;
          // coin.decreased = false;
          if (oldCoin) {
              if (oldCoin.lastPrice < coin.lastPrice) {
                // coin.decreased = true;
                coin.change = 'decreased';
                coin.changeImg = 'down';
              } else if (oldCoin.lastPrice > coin.lastPrice) {
                // coin.increased = true;
                coin.change = 'increased';
                coin.changeImg = 'up';
              }if (oldCoin.lastPrice === coin.lastPrice) {
                coin.change = 'unchanged';
              }
          }
          this.map.set(coin.symbol, coin);
        });
      }
      this.dataSource.data = <CoinPrice[]>Array.from(this.map.values()).sort(this.globals.dynamicSort('-lastPrice'));
      console.log('new prices update:' + JSON.stringify(this.dataSource.data));
    });
  }
  ngOnInit() {
    this.getCoinPrices();
  }
  getCoinPrices(): void {
    this.priceService.getCoinPrices()
    .subscribe(coinprices => {
      if (coinprices != null && coinprices.length !== 0) {
        coinprices.forEach(coin => {
          coin.addTime = this.globals.getDate(coin.addTime);
          coin.change = 'unchanged';
          this.map.set(coin.symbol, coin);
        });
      }
      this.dataSource.data = <CoinPrice[]>Array.from(this.map.values()).sort(this.globals.dynamicSort('-lastPrice'));
      console.log('coin prices:' + JSON.stringify(this.dataSource.data));
    });

  }
  ngOnDestroy() {
  }


}

      // , [
      // this hides everything right away
      // query(':enter', style({ opacity: 0 })),
      // starts to animate things with a stagger in between
      // query(':enter', stagger('100ms', [
      //   animate('1s', style({ opacity: 1 }))
      // ]))
      // query(':enter', animate('1s', style({ opacity: 1 }))
