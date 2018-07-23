import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaymentLibService {
  API_ROOT: string;
  CCD_CASE_NUMBER: string;
  PAYMENT_METHOD: string;

  constructor() { }

  setApiRootUrl(apiRoot: string): void {
    this.API_ROOT = apiRoot;
  }

  getApiRootUrl(): string {
    return this.API_ROOT;
  }

  setCcdCaseNumber(ccdCaseNumber: string): void {
    this.CCD_CASE_NUMBER = ccdCaseNumber;
  }

  getCcdCaseNumber(): string {
    return this.CCD_CASE_NUMBER;
  }

  setPaymentMethod(paymentMethod: string): void {
    this.PAYMENT_METHOD = paymentMethod;
  }

  getPaymentMethod(): string {
    return this.PAYMENT_METHOD;
  }
}
