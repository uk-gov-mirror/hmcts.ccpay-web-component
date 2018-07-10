import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICardDetails} from '../../interfaces/ICardDetails';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  _rootURL: string = 'http://localhost:9999/card-payments/RC-1531-0089-8858-9692/details';

  constructor(private http: HttpClient) { }

  getCardDetails(): Observable<ICardDetails> {
    return this.http.get<ICardDetails>(this._rootURL);
  }
}
