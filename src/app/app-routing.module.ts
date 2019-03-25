import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinPricesComponent } from './coin-prices/coin-prices.component';
import { CoinPriceDetailComponent } from './coin-price-detail/coin-price-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/prices', pathMatch: 'full'},
  { path: 'prices', component: CoinPricesComponent },
  { path: 'price/:symbol', component: CoinPriceDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
