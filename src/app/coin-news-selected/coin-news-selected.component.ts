import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../model/Article';
import { MatTableDataSource } from '@angular/material';
import CryptoNewsAPI from 'crypto-news-api';
import { Globals } from 'src/globals';
import { CoinPrice } from '../model/CoinPrice';

@Component({
  selector: 'app-coin-news-selected',
  templateUrl: './coin-news-selected.component.html',
  styleUrls: ['./coin-news-selected.component.css']
})
export class CoinNewsSelectedComponent implements OnInit {
@Input() symbol: string;
constructor( private globals: Globals) { }
 // Connect to the CryptoControl API
 API = new CryptoNewsAPI('1a8d6d55ed7855fb0bc364702ee491ac');
 // Connect to a self-hosted proxy server (to improve performance) that points to cryptocontrol.io
 ProxyApi = new CryptoNewsAPI('1a8d6d55ed7855fb0bc364702ee491ac', 'http://cryptocontrol_proxy/api/v1/public');
 // datasource for the price tabel
 dataSource = new MatTableDataSource<Article>();
 displayedColumns: string[] = ['thumbnail', 'title'];
 coinName: string;

 ngOnInit() {
   this.getTopFeedByCoin();
 }
 getTopFeedByCoin() {
  console.log('symbol:' + this.symbol);
  this.coinName = this.globals.coinmapapi.get(this.symbol).toLocaleLowerCase();

   console.log('coin name:' + this.coinName);
   // Enable the sentiment datapoints
   this.API.enableSentiment();
   const news = new Array<Article>();
   // call API to get lates news
   this.API.getTopNewsByCoin(this.coinName)
     .then( articles => {
       if (articles) {
         console.log(articles);
       articles.forEach( article => {
         const newArticle = new Article();
         newArticle.title = article.title;
         newArticle.description = article.description;
         newArticle.thumbnail = article.thumbnail;
         newArticle.originalImageUrl = article.originalImageUrl;
         newArticle.url = article.url;
         newArticle.publishAt = this.globals.getDate(article.publishedAt);
         newArticle.sourceName = article.source.name;
         news.push(newArticle);
       });
      }
       if ( news ) {
         this.dataSource.data = news;
         // console.log(news);
       }
     })
     .catch(function (error) { console.log(error); });
   }

}
