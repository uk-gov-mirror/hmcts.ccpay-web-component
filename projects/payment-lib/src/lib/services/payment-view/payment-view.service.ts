import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import {IPayment} from '../../interfaces/IPayment';
import {PaymentLibService} from '../../payment-lib.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentViewService {

  constructor(private http: HttpClient,
              private paymentLibService: PaymentLibService) { }

  getPaymentDetails(paymentReference: string): Observable<IPayment> {
    return this.http.get<IPayment>(`${this.paymentLibService.API_ROOT}/card-payments/${paymentReference}`);
  }
}
