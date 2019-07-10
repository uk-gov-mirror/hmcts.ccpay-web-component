import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import {IPayment} from '../../interfaces/IPayment';
import {PaymentLibService} from '../../payment-lib.service';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../shared/logger/logger.service';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';


@Injectable({
  providedIn: 'root'
})
export class PaymentViewService {

  constructor(private http: HttpClient,
              private logger: LoggerService,
              private errorHandlerService: ErrorHandlerService,
              private paymentLibService: PaymentLibService) { }

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

  getRemissio
}
