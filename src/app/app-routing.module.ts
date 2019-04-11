import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinPricesComponent } from './coin-prices/coin-prices.component';
import { CoinPriceChartComponent } from './coin-price-chart/coin-price-chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/prices', pathMatch: 'full'},
  { path: 'prices', component: CoinPricesComponent },
  { path: 'price/:symbol', component: CoinPriceChartComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
