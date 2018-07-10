import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

import {IPayment} from '../../interfaces/IPayment';


@Injectable({
  providedIn: 'root'
})
export class PaymentViewService {

  API_URL: string = environment.API_URL + '/card-payments/';

  constructor(private http: HttpClient) { }

  getPaymentDetails(paymentReference: string): Observable<IPayment> {
    return this.http.get<IPayment>(this.API_URL + paymentReference);
  }
}
