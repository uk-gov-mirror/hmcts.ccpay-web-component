import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import {IPayment} from '../../interfaces/IPayment';
import {PaymentLibService} from '../../payment-lib.service';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../shared/logger/logger.service';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import { AddRemissionRequest } from '../../interfaces/AddRemissionRequest';
import { PaymentToPayhubRequest } from '../../interfaces/PaymentToPayhubRequest';
import { Meta } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class PaymentViewService {

  private meta: Meta;

  constructor(private http: HttpClient,
              private logger: LoggerService,
              private errorHandlerService: ErrorHandlerService,
              private paymentLibService: PaymentLibService) { }

  addHeaders(options: any): any {
    const headers = {};
    if (options.headers) {
      options.headers.forEach(element => {
        headers[element] = options.headers.get(element);
      });
    }
    headers['X-Requested-With'] = 'XMLHttpRequest';

    if (this.meta && this.meta.getTag('name=csrf-token')) {
      const csrfToken = this.meta.getTag('name=csrf-token');
      headers['CSRF-Token'] = csrfToken.content;
    }
    options.headers = new HttpHeaders(headers);
    options.responseType = 'text';
    return options;
  }

  getPaymentDetails(paymentReference: string, paymentMethod: string): Observable<IPayment> {
    this.logger.info('Payment-view-service getPaymentDetails for: ', paymentReference);

    return this.http.get<IPayment>(paymentMethod === 'card' ?
          `${this.paymentLibService.API_ROOT}/card-payments/${paymentReference}` :
          `${this.paymentLibService.API_ROOT}/credit-account-payments/${paymentReference}`, {
        withCredentials: true
      })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  getPaymentGroupDetails(paymentGroupReference: string, paymentMethod: string): Observable<IPaymentGroup> {
    this.logger.info('Payment-view-service getPaymentGroupDetails for: ', paymentGroupReference);

    return this.http.get<IPayment>(`${this.paymentLibService.API_ROOT}/payment-groups/${paymentGroupReference}`, {
      withCredentials: true
    })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  postPaymentGroupWithRemissions(paymentGroupReference: string, feeId: number, body: AddRemissionRequest): Observable<any> {
    return this.http.post(`${this.paymentLibService.API_ROOT}/payment-groups/${paymentGroupReference}/fees/${feeId}/remissions`, body).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  deleteFeeFromPaymentGroup(feeId: number): Observable<any> {
        this.logger.info('Payment-view-service deleteFeeFromPaymentGroup for: ', feeId);
    return this.http.delete(`${this.paymentLibService.API_ROOT}/fees/${feeId}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  postPaymentToPayHub(body: PaymentToPayhubRequest): Observable<any> {
    const opts = {};
    this.addHeaders(opts);
    return this.http.post(`${this.paymentLibService.API_ROOT}/send-to-payhub`, body, opts).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}
