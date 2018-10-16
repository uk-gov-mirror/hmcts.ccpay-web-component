import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import {PaymentLibService} from '../../payment-lib.service';
import { IPayments } from '../../interfaces/IPayments';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { LoggerService } from '../shared/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {
  payments: IPayments;

  constructor(private http: HttpClient,
              private logger: LoggerService,
              private errorHandlerService: ErrorHandlerService,
              private paymentLibService: PaymentLibService) { }


  getPaymentByCcdCaseNumber(ccdCaseNumber: string, paymentMethod: string): Observable<IPayments> {
    this.logger.info('Payment-list-service getPaymentByCcdCaseNumber for: ', ccdCaseNumber);

    return this.http.get<IPayments>(`${this.paymentLibService.API_ROOT}/cases/${ccdCaseNumber}/payments`, {
        withCredentials: true
      })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
}
