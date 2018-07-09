import { Injectable } from '@angular/core';

import { ICasePayments } from '../../interfaces/ICasePayments';
import { CASEPAYMENTS } from '../../components/payment-list/mock-case-payments-data';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {

  constructor() { }

  getPayments(): ICasePayments[] {
    return CASEPAYMENTS;
  }
}
