import { Injectable } from '@angular/core';
import {PaymentLibComponent} from './payment-lib.component';

@Injectable({
  providedIn: 'root'
})

export class PaymentLibService {
  API_ROOT: string;

  constructor() { }

  setApiRootUrl(apiRoot: string): void {
    this.API_ROOT = apiRoot;
  }

  getApiRootUrl(): string {
    return this.API_ROOT;
  }
}
