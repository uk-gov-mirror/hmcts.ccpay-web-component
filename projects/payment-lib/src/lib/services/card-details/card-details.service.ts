import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

import {ICardDetails} from '../../interfaces/ICardDetails';
import {PaymentLibService} from '../../payment-lib.service';


@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  constructor(private http: HttpClient,
              private paymentLibService: PaymentLibService) { }

  getCardDetails(paymentReference: string): Observable<ICardDetails> {
    return this.http.get<ICardDetails>(`${this.paymentLibService.API_ROOT}/card-payments/${paymentReference}/details`);
  }
}
