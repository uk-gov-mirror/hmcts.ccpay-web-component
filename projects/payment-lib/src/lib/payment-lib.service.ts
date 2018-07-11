import { Injectable } from '@angular/core';
import {PaymentLibComponent} from './payment-lib.component';

@Injectable({
  providedIn: 'root'
})

export class PaymentLibService {
  API_ROOT: string;

  constructor(private paymentLibComponent: PaymentLibComponent) { }

  getApiRootUrl(apiRoot: string): string {
    return this.paymentLibComponent.API_ROOT;
  }
}
