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
  selector: 'app-coin-price-chart',
  templateUrl: './coin-price-chart.component.html',
  styleUrls: ['./coin-price-chart.component.css']
})
export class CoinPriceChartComponent implements OnInit {
  @ViewChild('chart')
  chart: GoogleChartComponent;
  symbol: string;
  coinPriceBySymbol: Array<CoinPrice>;
  // key symbol_daily, symbol_weekly ...
  map = new Map<string, CoinPrice[]>();

  constructor(
    private priceService: PriceService,
    private route: ActivatedRoute,
    private location: Location,
    private globals: Globals) { }

    title: string;
    chartData = [];
    // chartData = [['Time', 'Price']];
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

    // var data = [];
    // data[0] = google.visualization.arrayToDataTable(rowData1);
    // data[1] = google.visualization.arrayToDataTable(rowData2);
  ngOnInit() {
    // this.getCoinPriceLive();
    this.getCoinPriceDaily();
  }
  getCoinPriceLive(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.chartData = [];
    // console.log('symbol:' + this.symbol);
    this.priceService.getCoinPriceLive(this.symbol)
    .subscribe(coinpricesOfSymbol => {
      if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
        coinpricesOfSymbol.forEach(price => {
          price.addTime = this.globals.getDate(price.addTime);
          const newPriceElement = [ price.addTime, price.lastPrice];
          this.chartData.push(newPriceElement);
          // console.log('new price Element:' + newPriceElement);
        });
      }
      this.chartData[0].reverse();
      this.title = 'Live ' + this.symbol + ' prices';
    });
  }

  getCoinPriceDaily(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_daily';
    this.chartData = this.map.get(key);
    console.log('daily chart found in cache:');
    if ( this.chartData == null || this.chartData.length === 0) {
      console.log('daily chart not found in local cache:');
      this.chartData = [];
      this.priceService.getCoinPriceDaily(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ price.addTime, price.lastPrice];
            this.chartData.push(newPriceElement);
            // console.log('new price Element:' + newPriceElement);
          });
        }
        this.map.set(key, this.chartData.reverse());
        // this.chartData.reverse();
        this.title = 'Last 1 day ' + this.symbol + ' prices';
      });
    }
  }
  getCoinPriceWeekly(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_weekly';
    this.chartData = this.map.get(key);
    console.log('weekly chart found in cache:');
    if ( this.chartData == null || this.chartData.length === 0) {
      console.log('weekly chart not found in local cache:');
      this.chartData = [];
      // console.log('symbol:' + this.symbol);
      this.priceService.getCoinPriceWeekly(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ price.addTime, price.lastPrice];
            this.chartData.push(newPriceElement);
            // console.log('new price Element:' + newPriceElement);
          });
        }
        this.map.set(key, this.chartData.reverse());
        this.title = 'Last 1 week ' + this.symbol + ' prices';
      });
    }
  }
  getCoinPriceMonthly(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_monthly';
    this.chartData = this.map.get(key);
    console.log('monthly chart found in cache:');
    if ( this.chartData == null || this.chartData.length === 0) {
      console.log('monthly chart not found in local cache:');
      this.chartData = [];
      // console.log('symbol:' + this.symbol);
      this.priceService.getCoinPriceMonthly(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ price.addTime, price.lastPrice];
            this.chartData.push(newPriceElement);
            // console.log('new price Element:' + newPriceElement);
          });
        }
        this.map.set(key, this.chartData.reverse());
        this.title = 'Last 1 month ' + this.symbol + ' prices';
      });
    }
  }
  getCoinPriceYearly(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_yearly';
    this.chartData = this.map.get(key);
    console.log('yearly chart found in cache:');
    if ( this.chartData == null || this.chartData.length === 0) {
      console.log('yearly chart not found in local cache:');
      this.chartData = [];
      // console.log('symbol:' + this.symbol);
      this.priceService.getCoinPriceYearly(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ price.addTime, price.lastPrice];
            this.chartData.push(newPriceElement);
            // console.log('new price Element:' + newPriceElement);
          });
        }
        this.map.set(key, this.chartData.reverse());
        this.title = 'Last 1 year ' + this.symbol + ' prices';
      });
    }
  }
  showLivePrices() {
    this.getCoinPriceLive();
  }
  showDailyPrices() {
    this.getCoinPriceDaily();
  }
  showWeeklyPrices() {
    this.getCoinPriceWeekly();
  }
  showMonthlyPrices() {
    this.getCoinPriceMonthly();
  }
  showYearlyPrices() {
    this.getCoinPriceYearly();
  }
}
