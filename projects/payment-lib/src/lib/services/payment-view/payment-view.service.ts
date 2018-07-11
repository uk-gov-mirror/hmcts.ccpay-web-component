import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import {IPayment} from '../../interfaces/IPayment';


@Injectable({
  providedIn: 'root'
})
export class PaymentViewService {

  API_URL: string = 'http://localhost:9999' + '/card-payments/';

  constructor(private http: HttpClient) { }

  getPaymentDetails(paymentReference: string): Observable<IPayment> {
    return this.http.get<IPayment>(this.API_URL + paymentReference);
  }
}
