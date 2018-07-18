import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import {PaymentLibService} from '../../payment-lib.service';
import { IPayments } from '../../interfaces/IPayments';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {

  constructor(private http: HttpClient,
              private paymentLibService: PaymentLibService) { }


  getPaymentByCcdCaseNumber(ccdCaseNumber: string, paymentMethod: string): Observable<IPayments> {
    console.log('Payment service get payment by ccd case number: ', ccdCaseNumber);

    let params = new HttpParams();
    params = params.append('ccd_case_number', ccdCaseNumber);
    params = params.append('payment_method', paymentMethod.toUpperCase());

    return this.http.get<IPayments>(`${this.paymentLibService.API_ROOT}/payments`, { params : params });
  }
}
