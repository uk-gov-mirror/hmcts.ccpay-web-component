import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

import {ICardDetails} from '../../interfaces/ICardDetails';


@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getCardDetails(paymentReference: string): Observable<ICardDetails> {
    return this.http.get<ICardDetails>(`${this.API_URL}/card-payments/${paymentReference}/details`);
  }
}
