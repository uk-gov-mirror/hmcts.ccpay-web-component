import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {PaymentLibService} from '../../payment-lib.service';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import { IBSPayments } from '../../interfaces/IBSPayments';
import { UnidentifiedPaymentsRequest } from '../../interfaces/UnidentifiedPaymentsRequest';
import { UnsolicitedPaymentsRequest } from '../../interfaces/UnsolicitedPaymentsRequest';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';


@Injectable({
  providedIn: 'root'
})
export class BulkScaningPaymentService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService,
              private paymentLibService: PaymentLibService
              ) { }

  getBSPaymentsByCCD(ccdCaseNumber: string): Observable<IBSPayments> {
      return this.http.get<IBSPayments>(`${this.paymentLibService.BULKSCAN_API_ROOT}/cases/${ccdCaseNumber}`, {
      withCredentials: true
    })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
  getBSPaymentsByDCN(dcn: string): Observable<IBSPayments> {
    return this.http.get<IBSPayments>(`${this.paymentLibService.BULKSCAN_API_ROOT}/cases?document_control_number=${dcn}`, {
      withCredentials: true
    })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
  postBSAllocatePayment(body: AllocatePaymentRequest, paymentRef: string): Observable<any> {
    return this.http.post(`${this.paymentLibService.API_ROOT}/payment-groups/${paymentRef}/bulk-scan-payments`, body).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
  patchBSChangeStatus(dcnNumber: string, status: string): Observable<any> {
    return this.http.patch(`${this.paymentLibService.API_ROOT}/bulk-scan-payments/${dcnNumber}/${status}`, status).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}
