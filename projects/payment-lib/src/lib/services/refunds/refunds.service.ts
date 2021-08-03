import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../shared/error-handler.service';
import { WebComponentHttpClient } from '../shared/httpclient/webcomponent.http.client';
import {PaymentLibService} from '../../payment-lib.service';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';
import { IRefundReasons } from '../../interfaces/IRefundReasons';


@Injectable({
  providedIn: 'root'
})
export class RefundsService {

  constructor(private http: HttpClient,
    private https: WebComponentHttpClient,
              private errorHandlerService: ErrorHandlerService,
              private paymentLibService: PaymentLibService
              ) { }

  getRefundReasons(): Observable<IRefundReasons[]> {
      return this.http.get<IRefundReasons[]>(`${this.paymentLibService.REFUNDS_API_ROOT}/reasons`, {
      withCredentials: true
  })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
 
  postBSAllocatePayment(body: AllocatePaymentRequest, paymentRef: string): Observable<any> {
    return this.https.post(`${this.paymentLibService.API_ROOT}/payment-groups/${paymentRef}/bulk-scan-payments`, body).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

}
