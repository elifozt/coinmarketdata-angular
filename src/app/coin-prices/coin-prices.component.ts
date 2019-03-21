import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../service/price.service';
import { CoinPrice } from '../CoinPrice';
import { MatTableDataSource } from '@angular/material';
import { Globals } from '../../globals';
// import '../../../node_modules/cryptocurrency-icons';

@Component({
  selector: 'app-coin-prices',
  templateUrl: './coin-prices.component.html',
  styleUrls: ['./coin-prices.component.css']
})
export class CoinPricesComponent implements OnInit {
  cp: Array<CoinPrice> = new Array<CoinPrice>();
  dataSource = new MatTableDataSource<CoinPrice>();
  displayedColumns: string[] = ['index', 'symbol', 'lastPrice', 'volume'];
  constructor(private priceService: PriceService, private globals: Globals) {
    priceService.messages.subscribe(coinprices => {
      // console.log('Response from websocket: ' + JSON.stringify(coinprices));
      this.dataSource.data = coinprices;
    });
  }
  ngOnInit() {
    this.getCoinPrices();
  }
  getCoinPrices(): void {

    this.priceService.getCoinPrices()
    .subscribe(coinprices => {
      console.log('Response from http: ' + JSON.stringify(coinprices));
      if (coinprices != null && coinprices.length !== 0) {
        coinprices.forEach(coin => {
          coin.addTime = this.globals.getDate(coin.addTime);
        });
      }
      this.dataSource.data = coinprices;
    });

  }


}
