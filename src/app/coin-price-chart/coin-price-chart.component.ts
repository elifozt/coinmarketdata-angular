import { Component, OnInit, Input } from '@angular/core';
import { PriceService} from '../../service/price.service';
import { CoinPrice } from '../model/CoinPrice';
import { RawChartComponent, GoogleChartComponent } from 'angular-google-charts';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Globals } from '../../globals';

@Component({
  selector: 'app-coin-price-chart',
  templateUrl: './coin-price-chart.component.html',
  styleUrls: ['./coin-price-chart.component.css']
})
export class CoinPriceChartComponent implements OnInit {
  @ViewChild('chart')
  chart: GoogleChartComponent;
  symbol: string;
  // key symbol_daily, symbol_weekly ...
  map = new Map<string, CoinPrice[]>();

  constructor(
    private priceService: PriceService,
    private route: ActivatedRoute,
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
    this.getCoinPriceLive();
  }
  getCoinPriceLive(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_live';
    this.chartData = this.map.get(key);
    this.title = 'Live (last 1 hour) ' + this.symbol + ' prices';
    if ( this.chartData == null || this.chartData.length === 0) {
      this.chartData = [];
      this.priceService.getCoinPriceLive(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ new Date(price.addTime), price.lastPrice];
            this.chartData.push(newPriceElement);
          });
        }
        this.map.set(key, this.chartData);
      });
    }
  }
  getCoinPriceDaily(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_daily';
    this.chartData = this.map.get(key);
    this.title = 'Last 1 day ' + this.symbol + ' prices';
    if ( this.chartData == null || this.chartData.length === 0) {
      this.chartData = [];
      this.priceService.getCoinPriceDaily(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ new Date(price.addTime), price.lastPrice];
            this.chartData.push(newPriceElement);
          });
        }
        this.map.set(key, this.chartData.reverse());
      });
    }
  }
  getCoinPriceWeekly(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_weekly';
    this.chartData = this.map.get(key);
    this.title = 'Last 1 week ' + this.symbol + ' prices';
    if ( this.chartData == null || this.chartData.length === 0) {
      this.chartData = [];
      this.priceService.getCoinPriceWeekly(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ new Date(price.addTime), price.lastPrice];
            this.chartData.push(newPriceElement);
          });
        }
        this.map.set(key, this.chartData.reverse());
      });
    }
  }
  getCoinPriceMonthly(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_monthly';
    this.chartData = this.map.get(key);
    this.title = 'Last 1 month ' + this.symbol + ' prices';
    if ( this.chartData == null || this.chartData.length === 0) {
      this.chartData = [];
      this.priceService.getCoinPriceMonthly(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ new Date(price.addTime), price.lastPrice];
            this.chartData.push(newPriceElement);
          });
        }
        this.map.set(key, this.chartData.reverse());
      });
    }
  }
  getCoinPriceYearly(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    const key = this.symbol + '_yearly';
    this.chartData = this.map.get(key);
    this.title = 'Last 1 year ' + this.symbol + ' prices';
    if ( this.chartData == null || this.chartData.length === 0) {
      this.chartData = [];
      this.priceService.getCoinPriceYearly(this.symbol)
      .subscribe(coinpricesOfSymbol => {
        if (coinpricesOfSymbol != null && coinpricesOfSymbol.length !== 0) {
          coinpricesOfSymbol.forEach(price => {
            price.addTime = this.globals.getDate(price.addTime);
            const newPriceElement = [ new Date(price.addTime), price.lastPrice];
            this.chartData.push(newPriceElement);
          });
        }
        this.map.set(key, this.chartData.reverse());
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
