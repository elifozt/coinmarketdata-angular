import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { CoinPricesComponent } from './coin-prices/coin-prices.component';
import { CoinPriceChartComponent } from './coin-price-chart/coin-price-chart.component';
import { MatTableModule, MatCardModule, MatGridListModule } from '@angular/material';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoinNewsComponent } from './coin-news/coin-news.component';
import { CoinNewsSelectedComponent } from './coin-news-selected/coin-news-selected.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    CoinPricesComponent,
    CoinPriceChartComponent,
    CoinNewsComponent,
    CoinNewsSelectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
