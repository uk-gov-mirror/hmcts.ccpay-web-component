import { Injectable } from '@angular/core';

import { IPaymentDetails } from '../../interfaces/IPaymentDetails';
import { PAYMENTDETAILS } from '../../components/payment-view/mock-payment-details-data';

@Injectable({
  providedIn: 'root'
})
export class PaymentViewService {

  constructor() { }

  getPaymentDetails(): IPaymentDetails[] {
    return PAYMENTDETAILS;
  }
}
