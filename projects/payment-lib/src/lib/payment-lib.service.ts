import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaymentLibService {
  API_ROOT: string;
  BULKSCAN_API_ROOT: string;
  REFUNDS_API_ROOT: string;
  CURRENTENV: string;

  constructor() { }

  setApiRootUrl(apiRoot: string): void {
    this.API_ROOT = apiRoot;
  }

  getApiRootUrl(): string {
    return this.API_ROOT;
  }

  setBulkScanApiRootUrl(bulkscanapiRoot: string): void {
    this.BULKSCAN_API_ROOT = bulkscanapiRoot;
  }

  getBulkScanApiRootUrl(): string {
    return this.BULKSCAN_API_ROOT;
  }

  setRefundndsApiRootUrl(refundsapiRoot: string): void {
    this.REFUNDS_API_ROOT = refundsapiRoot;
  }

  getRefundsApiRootUrl(): string {
    return this.REFUNDS_API_ROOT;
  }
  setCurrentEnv(currentEnvironment: string):void {
    this.CURRENTENV = currentEnvironment;
  }
  getCurrentEnv(): string {
    return this.CURRENTENV;
  }
}
