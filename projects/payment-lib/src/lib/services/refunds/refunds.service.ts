import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../shared/error-handler.service';
import { WebComponentHttpClient } from '../shared/httpclient/webcomponent.http.client';
import {PaymentLibService} from '../../payment-lib.service';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';
import { IRefundReasons } from '../../interfaces/IRefundReasons';
import { IRefundList } from '../../interfaces/IRefundList';
import { IssueRefundRequest } from '../../interfaces/IssueRefundRequest';

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

  getRefundList(refundstatus: string, selfexclusive:boolean): Observable<IRefundList[]> {
    return this.http.get<IRefundList[]>(`${this.paymentLibService.REFUNDS_API_ROOT}/get-refund-list?status=${refundstatus}&?selfExclusive=${selfexclusive}`, {
    withCredentials: true
})
    .pipe(
      catchError(this.errorHandlerService.handleError)
    );
}

  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.paymentLibService.REFUNDS_API_ROOT}/get-user-details`, {
    withCredentials: true
  })
    .pipe(
      catchError(this.errorHandlerService.handleError)
    );
}
 
  postIssueRefund(body: IssueRefundRequest): Observable<any> {
    return this.https.post(`${this.paymentLibService.REFUNDS_API_ROOT}/refund`, body).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

}
