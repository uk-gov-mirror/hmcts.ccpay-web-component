import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PaymentLibService} from './payment-lib.service';

@Component({
  selector: 'ccpay-payment-lib',
  template: `
    <ccpay-payment-list *ngIf="viewName === 'payment-list'"></ccpay-payment-list>
    <ccpay-payment-view *ngIf="viewName === 'payment-view'"></ccpay-payment-view>
    <ccpay-case-transactions *ngIf="viewName === 'case-transactions'"></ccpay-case-transactions>
  `
})

export class PaymentLibComponent implements OnInit {
  @Input('API_ROOT') API_ROOT: string;
  @Input('CCD_CASE_NUMBER') CCD_CASE_NUMBER: string;
  @Input('PAYMENT_METHOD') PAYMENT_METHOD: string;
  @Input('VIEW') VIEW: string;

  paymentMethod: string;
  paymentGroupReference: string;
  paymentReference: string;
  viewName: string;

  constructor(private router: Router,
              private paymentLibService: PaymentLibService) { }

  ngOnInit() {
    this.paymentLibService.setApiRootUrl(this.API_ROOT);
    if (this.VIEW === 'case-transactions') {
      console.log('isCaseTransactions....');
      this.viewName = 'case-transactions';
    } else {
      console.log('isPaymentList....');
      this.viewName = 'payment-list';
    }
  }

}
