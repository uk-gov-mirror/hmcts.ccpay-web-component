import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PaymentLibService} from './payment-lib.service';

@Component({
  selector: 'ccpay-payment-lib',
  template: `
    <ccpay-payment-list *ngIf="viewName === 'payment-list'"></ccpay-payment-list>
    <ccpay-payment-view *ngIf="viewName === 'payment-view'"></ccpay-payment-view>
  `
})

export class PaymentLibComponent implements OnInit {
  @Input('API_ROOT') API_ROOT: string;
  @Input('CCD_CASE_NUMBER') CCD_CASE_NUMBER: string;
  @Input('PAYMENT_METHOD') PAYMENT_METHOD: string;

  paymentMethod: string;
  paymentReference: string;
  viewName: string = 'payment-list';

  constructor(private router: Router,
              private paymentLibService: PaymentLibService) { }

  ngOnInit() {
    this.paymentLibService.setApiRootUrl(this.API_ROOT);
  }

}
