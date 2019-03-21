import { Injectable } from '@angular/core';
import { CoinPrice } from '../app/CoinPrice';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { WebsocketService } from './websocket.service';
import { Subject} from 'rxjs';
import 'rxjs/add/operator/map';

// url from the environment.ts file
const SERVER_URL = environment.server_url;
const WS_SERVER_URL = 'ws://localhost:8080/websocket';
@Injectable({
  providedIn: 'root'
})

export class PriceService {
  cp: Observable<CoinPrice[]>;
  public messages: Subject<CoinPrice[]>;

  constructor(private http: HttpClient, private messageService: MessageService, private websocketService: WebsocketService) {
    this.connectWebSocket();
    console.log('message:' + this.messages);
  }
  public connectWebSocket() {
    this.messages = <Subject<CoinPrice[]>>this.websocketService
        .connect(WS_SERVER_URL)
        .map((response: MessageEvent): any => {
          return JSON.parse(response.data);
        });
}
  getCoinPrices(): Observable<CoinPrice[]> {
      return this.http.get<CoinPrice[]>(SERVER_URL + '/prices')
      .pipe(
        tap(result => {
          this.log('fetched coinprices');
        }),
        catchError(this.handleError('getCoinPrices', []))
      );
  }


  /** GET price by coin symbolWill 404 if id not found */
  getCoinPrice(symbol: string): Observable<CoinPrice[]> {
    const url = `${SERVER_URL}/price/${symbol}`;
    console.log('url:' + url);
    this.cp = this.http.get<CoinPrice[]>(url)
    .pipe(
      tap(result => {
        this.log(`fetched coin symbol=${symbol}`);
        console.log(result);
      }),
      catchError(this.handleError(`getCoinPrice id=${symbol}`, []))
    );
    // console.log('returning:' + JSON.stringify(this.cp));
    return this.cp;
  }

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
}

