import { Injectable } from '@angular/core';
import {CoinPrice} from './CoinPrice';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { JsonPipe } from '@angular/common';

// url from the environment.ts file
const SERVER_URL = environment.server_url;
@Injectable({
  providedIn: 'root'
})
export class PriceService {
  cp: Observable<CoinPrice[]>;

  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`PriceService: ${message}`);
}
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
/*
   prices: CoinPrice[] = [
    { symbol: 'BTC', lastPrice: '4000' },
    { symbol: 'ETH', lastPrice: '120' },
    { symbol: 'LTC', lastPrice: '3' },
    { symbol: 'XRP', lastPrice: '5' }
  ];
*/

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getCoinPrices(): Observable<CoinPrice[]> {

      return this.http.get<CoinPrice[]>(SERVER_URL + '/prices')
      .pipe(
        tap(_ => this.log('fetched coinprices')),
        catchError(this.handleError('getCoinPrices', []))
      );
  }


  /** GET price by coin symbolWill 404 if id not found */
  getCoinPrice(symbol: string): Observable<CoinPrice[]> {
    const url = `${SERVER_URL}price/${symbol}`;
    console.log('url:' + url);
    this.cp = this.http.get<CoinPrice[]>(url)
    .pipe(
      tap(result => {
        this.log(`fetched coin symbol=${symbol}`);
        // console.log(result);
      }),
      catchError(this.handleError(`getCoinPrice id=${symbol}`, []))
    );
    // console.log('returning:' + JSON.stringify(this.cp));
    return this.cp;
  }
}

