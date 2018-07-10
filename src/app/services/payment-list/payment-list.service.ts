import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {IPayment} from '../../interfaces/IPayment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {

  _rootURL: string = 'http://localhost:9999/card-payments/';

  constructor(private http: HttpClient) { }

  getPaymentByReference(paymentReference: string): Observable<IPayment> {
    console.log('Payment details for the reference: ', paymentReference);

    this._rootURL = this._rootURL + paymentReference;
    return this.http.get<IPayment>(this._rootURL);
  }

}
