import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

import {ICardDetails} from '../../interfaces/ICardDetails';


@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  API_URL: string = 'http://localhost:9999';

  constructor(private http: HttpClient) { }

  getCardDetails(paymentReference: string): Observable<ICardDetails> {
    return this.http.get<ICardDetails>(`${this.API_URL}/card-payments/${paymentReference}/details`);
  }
}
