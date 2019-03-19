import { Component, OnInit } from '@angular/core';
import { PriceService } from '../price.service';
import { CoinPrice } from '../CoinPrice';
import { MatTableDataSource } from '@angular/material';
import { Globals } from '../../globals';

@Component({
  selector: 'app-coin-prices',
  templateUrl: './coin-prices.component.html',
  styleUrls: ['./coin-prices.component.css']
})
export class CoinPricesComponent implements OnInit {
  coinPrices: Array<CoinPrice>;
  dataSource = new MatTableDataSource<CoinPrice>();
  displayedColumns: string[] = ['index', 'symbol', 'lastPrice', 'volume'];

  constructor(private priceService: PriceService, private globals: Globals) { }
  ngOnInit() {
    this.getCoinPrices();
  }
  getCoinPrices(): void {
    this.priceService.getCoinPrices()
    .subscribe(coinprices => {

      if (coinprices != null && coinprices.length !== 0) {
        // console.log('serverlist: ' + JSON.stringify(serverList));
        coinprices.forEach(coin => {
          coin.addTime = this.globals.getDate(coin.addTime);
        });
      }
      this.dataSource.data = coinprices;
    });
  }


}
