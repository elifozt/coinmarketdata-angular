import { Component, OnInit, Input } from '@angular/core';
import { PriceService} from '../../service/price.service';
import { CoinPrice } from '../CoinPrice';
import { GoogleChartComponent } from 'angular-google-charts';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { MatTableDataSource } from '@angular/material';
// import '../../../node_modules/cryptocurrency-icons';

@Component({
  selector: 'app-coin-price-detail',
  templateUrl: './coin-price-detail.component.html',
  styleUrls: ['./coin-price-detail.component.css']
})
export class CoinPriceDetailComponent implements OnInit {
  @ViewChild('chart')
  chart: GoogleChartComponent;

  symbol: string;
  coinPriceBySymbol: Array<CoinPrice>;
  dataSource = new MatTableDataSource<CoinPrice>();

  constructor(
    private priceService: PriceService,
    private route: ActivatedRoute,
    private location: Location,
    private globals: Globals) { }

    title: string;
    chartData = [];
    type = 'LineChart';
    columnNames = ['Time', 'Price'];
    options = {
       hAxis: {
          title: 'Time',
          textPosition: 'none'
       },
       vAxis: {
          title: 'Price'
       },
       legend: 'none'
    };
    width = 1000;
    height = 500;


  ngOnInit() {
    this.getCoinPriceBySymbol();
  }
  getCoinPriceBySymbol(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.priceService.getCoinPrice(this.symbol)
    .subscribe(coinpricesOfSymbol => {
      if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
        coinpricesOfSymbol.forEach(price => {
          price.addTime = this.globals.getDate(price.addTime);
          const newPriceElement = [ price.addTime, price.lastPrice];
          this.chartData.push(newPriceElement);
          // console.log('new price Element:' + newPriceElement);

        });
      }
      this.dataSource.data = coinpricesOfSymbol;
      this.title = 'Prices of ' + this.symbol;
    });
  }
}
