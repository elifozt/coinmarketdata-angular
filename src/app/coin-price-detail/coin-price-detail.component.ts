import { Component, OnInit, Input } from '@angular/core';
import { PriceService} from '../../service/price.service';
import { CoinPrice } from '../model/CoinPrice';
import { GoogleChartComponent } from 'angular-google-charts';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { MatTableDataSource } from '@angular/material';

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
      titleTextStyle: {
        color: '#2b3441'
      },
       hAxis: {
          title: 'Time',
          textPosition: 'none',
          titleTextStyle: {
            color: '#2b3441'
          }
       },
       vAxis: {
          title: 'Price',
          titleTextStyle: {
            color: '#2b3441'
          },
          textStyle: {
            color: '#2b3441'
          }
       },
       backgroundColor: '#f1f1f1',
       colors: ['#2b3441'],
       legend: 'none',
       crosshair: { trigger: 'both' }
    };
    width = 750;
    height = 500;
  ngOnInit() {
    this.getCoinPriceBySymbol();
  }
  getCoinPriceBySymbol(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    // console.log('symbol:' + this.symbol);
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
      this.chartData.reverse();
      this.dataSource.data = coinpricesOfSymbol;
      this.title = 'Last 1 hour ' + this.symbol + ' prices';
    });
  }
}
