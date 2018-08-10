import { Injectable } from '@angular/core';
import { PaymentLibService } from '../../payment-lib.service';
import { HttpClient } from '@angular/common/http';
import { IStatusHistories } from '../../interfaces/IStatusHistories';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StatusHistoryService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService,
              private paymentLibService: PaymentLibService) { }


  getPaymentStatusesByReference(paymentReference: string): Observable<IStatusHistories> {
    return this.http.get<IStatusHistories>(`${this.paymentLibService.API_ROOT}/card-payments/${paymentReference}/statuses`, {
        withCredentials: true
      })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
}
