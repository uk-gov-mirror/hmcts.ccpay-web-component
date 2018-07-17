import { Injectable } from '@angular/core';
import { PaymentLibService } from '../../payment-lib.service'
import { HttpClient } from '@angular/common/http'
import { IStatusHistories } from '../../interfaces/IStatusHistories'
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class StatusHistoryService {

  constructor(private http: HttpClient,
              private paymentLibService: PaymentLibService) { }


  getPaymentStatusesByReference(paymentReference: string): Observable<IStatusHistories> {
    return this.http.get<IStatusHistories>(`${this.paymentLibService.API_ROOT}/card-payments/${paymentReference}/statuses`);
  }
}
