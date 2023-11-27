import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../shared/logger/logger.service';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { PaymentLibService } from '../../payment-lib.service';
import { Observable } from 'rxjs';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaseTransactionsService {

  constructor(private http: HttpClient,
    private logger: LoggerService,
    private errorHandlerService: ErrorHandlerService,
    private paymentLibService: PaymentLibService
  ) { }

  getPaymentGroups(ccdCaseNumber: string): Observable<IPaymentGroup[]> {
    this.logger.info('Case-transactions-service getPaymentGroups for: ', ccdCaseNumber);

    return this.http.get<IPaymentGroup[]>(`${this.paymentLibService.API_ROOT}/cases/${ccdCaseNumber}/paymentgroups`, {
      withCredentials: true
    })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
}
