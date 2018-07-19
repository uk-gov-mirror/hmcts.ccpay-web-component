import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import {PaymentLibService} from '../../payment-lib.service';
import { IPayments } from '../../interfaces/IPayments';
import { catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {
  payments: IPayments;

  constructor(private http: HttpClient,
              private paymentLibService: PaymentLibService) { }


  getPaymentByCcdCaseNumber(ccdCaseNumber: string, paymentMethod: string): Observable<IPayments> {
    console.log('Payment service get payment by ccd case number: ', ccdCaseNumber);

    let params = new HttpParams();
    params = params.append('ccd_case_number', ccdCaseNumber);
    params = params.append('payment_method', paymentMethod.toUpperCase());

    return this.http.get<IPayments>(`${this.paymentLibService.API_ROOT}/payments`, { params : params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred.
      console.log('An error occurred: ', JSON.stringify(err));
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      console.log('Backend status error: ', err.status);
      errorMessage = `${err.error}`;
    }
    return _throw(errorMessage);
  }

}
