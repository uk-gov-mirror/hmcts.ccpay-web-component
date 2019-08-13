import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {PaymentLibService} from '../../payment-lib.service';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import { IBSPayments } from '../../interfaces/IBSPayments';

@Injectable({
  providedIn: 'root'
})
export class BulkScaningPaymentService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService,
              private paymentLibService: PaymentLibService
              ) { }

  getBSPayments(ccdCaseNumber: string): Observable<IBSPayments[]> {
    return this.http.get<IBSPayments[]>(`${this.paymentLibService.API_ROOT}/bulk-scaning/${ccdCaseNumber}/payments`, {
      withCredentials: true
    })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
  postBSUnidentifiedPayments(body: AddRemissionRequest): Observable<any> {
    return this.http.post(`${this.paymentLibService.API_ROOT}/bulk-scanning/unidentified-payments`, body).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
    postBSUnsolicitedPayments(body: AddRemissionRequest): Observable<any> {
    return this.http.post(`${this.paymentLibService.API_ROOT}/bulk-scanning/unsolicited-payments`, body).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}
