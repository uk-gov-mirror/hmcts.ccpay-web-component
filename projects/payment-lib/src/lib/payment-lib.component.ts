import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PaymentLibService} from './payment-lib.service';

@Component({
  selector: 'ccpay-payment-lib',
  template: `
    <ccpay-payment-list *ngIf="viewName === 'payment-list'"></ccpay-payment-list>
    <ccpay-payment-view *ngIf="viewName === 'payment-view'"></ccpay-payment-view>
    <ccpay-case-transactions *ngIf="viewName === 'case-transactions'"></ccpay-case-transactions>
    <ccpay-fee-summary *ngIf="viewName === 'fee-summary'"
                       [ccdCaseNumber]="CCD_CASE_NUMBER" [paymentGroupRef]="paymentGroupReference"></ccpay-fee-summary>
  `
})

export class PaymentLibComponent implements OnInit {
  @Input('API_ROOT') API_ROOT: string;
  @Input('CCD_CASE_NUMBER') CCD_CASE_NUMBER: string;
  @Input('PAYMENT_METHOD') PAYMENT_METHOD: string;
  @Input('VIEW') VIEW: string;
  @Input('PAYMENT_GROUP_REF') PAYMENT_GROUP_REF?: string;
  @Input('TAKEPAYMENT') TAKEPAYMENT: boolean;


  paymentMethod: string;
  paymentGroupReference: string;
  paymentReference: string;
  viewName: string;

  constructor(private router: Router,
              private paymentLibService: PaymentLibService) { }

  ngOnInit() {
    this.paymentLibService.setApiRootUrl(this.API_ROOT);
    if (this.PAYMENT_GROUP_REF) {
      this.paymentGroupReference = this.PAYMENT_GROUP_REF;
    }

    if (this.VIEW === 'fee-summary') {
      this.viewName = 'fee-summary';
    } else {
      this.viewName = 'case-transactions';
    }
  }
}
