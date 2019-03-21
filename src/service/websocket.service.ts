import { Injectable } from '@angular/core';
import { Observable , Observer, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {}

  private subject: Subject<MessageEvent>;
  private ws: WebSocket;

  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    this.ws = new WebSocket(url);
    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      return this.ws.close.bind(this.ws);
    });
    const observer = {
      next: (data: Object) => {
        console.log('Got some data : ' + data);
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
  public close() {
    console.log('on closing WS');
    this.ws.close();
    this.subject = null;
}
}
