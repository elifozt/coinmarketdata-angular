import { Component, OnInit } from '@angular/core';
import { Article } from '../model/Article';
import { MatTableDataSource } from '@angular/material';
import CryptoNewsAPI from 'crypto-news-api';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-coin-news',
  templateUrl: './coin-news.component.html',
  styleUrls: ['./coin-news.component.css']
})
export class CoinNewsComponent implements OnInit {
  // Connect to the CryptoControl API
  API = new CryptoNewsAPI('1a8d6d55ed7855fb0bc364702ee491ac');
  // Connect to a self-hosted proxy server (to improve performance) that points to cryptocontrol.io
  ProxyApi = new CryptoNewsAPI('1a8d6d55ed7855fb0bc364702ee491ac', 'http://cryptocontrol_proxy/api/v1/public');

  dataSource = new MatTableDataSource<Article>();
  displayedColumns: string[] = ['thumbnail', 'title'];

  constructor( private globals: Globals) { }

  ngOnInit() {
    this.getTopNews();
  }
  getTopNews() {
    // Enable the sentiment datapoints
    this.API.enableSentiment();
    const news = new Array<Article>();
    // Get top news
    this.API.getTopNews()
      .then( articles => {
        if (articles) {
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
        }); }
        if ( news ) {
          this.dataSource.data = news;
          // console.log(news);
        }
      })
      .catch(function (error) { console.log(error); });
    }
}
