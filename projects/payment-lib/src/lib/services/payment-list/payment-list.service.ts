import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {IPayment} from '../../interfaces/IPayment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {

  API_URL: string = 'http://localhost:9999';

  constructor(private http: HttpClient) { }

  getPaymentByReference(paymentReference: string): Observable<IPayment> {
    console.log('Payment details for the reference: ', paymentReference);
    return this.http.get<IPayment>(`${this.API_URL}/card-payments/${paymentReference}`);
  }

}
