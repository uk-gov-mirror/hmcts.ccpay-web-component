import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {IPayment} from '../../interfaces/IPayment';
import { Observable } from 'rxjs/internal/Observable';
import {PaymentLibService} from '../../payment-lib.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {

  constructor(private http: HttpClient,
              private paymentLibService: PaymentLibService) { }

  getPaymentByReference(paymentReference: string): Observable<IPayment> {
    console.log('Payment details for the reference: ', paymentReference);
    return this.http.get<IPayment>(`${this.paymentLibService.API_ROOT}/card-payments/${paymentReference}`);
  }

}
