import {Component, Input, OnInit} from '@angular/core';
import {PaymentLibService} from './payment-lib.service';
import { IBSPayments } from './interfaces/IBSPayments';

@Component({
  selector: 'ccpay-payment-lib',
  template: `
  <ccpay-refund-list *ngIf="viewName === 'refund-list'"></ccpay-refund-list>
    <ccpay-payment-list *ngIf="viewName === 'payment-list'"></ccpay-payment-list>
    <ccpay-payment-view *ngIf="viewName === 'payment-view'"
    [isTurnOff]="ISTURNOFF" [isTakePayment]="TAKEPAYMENT"  [caseType]="CASETYPE"
    [isOldPcipalOff]="ISOLDPCIPALOFF"
    [isNewPcipalOff]="ISNEWPCIPALOFF"></ccpay-payment-view>
    <ccpay-case-transactions  *ngIf="viewName === 'case-transactions'"></ccpay-case-transactions>
    <app-mark-unidentified-payment *ngIf="viewName === 'unidentifiedPage'"
    [caseType]="CASETYPE"></app-mark-unidentified-payment>
    <app-mark-unsolicited-payment *ngIf="viewName === 'unsolicitedPage'"
    [caseType]="CASETYPE"></app-mark-unsolicited-payment>
    <app-allocate-payments *ngIf="viewName === 'allocate-payments'"
    [isTurnOff]="ISTURNOFF"
    [caseType]="CASETYPE"
    ></app-allocate-payments>
    <ccpay-fee-summary *ngIf="viewName === 'fee-summary'"
      [ccdCaseNumber]="CCD_CASE_NUMBER" 
      [paymentGroupRef]="paymentGroupReference"
      [isTurnOff]="ISTURNOFF"
      [caseType]="CASETYPE"
      [isOldPcipalOff]="ISOLDPCIPALOFF"
      [isNewPcipalOff]="ISNEWPCIPALOFF"
      ></ccpay-fee-summary>
    <ccpay-reports *ngIf="viewName === 'reports'"></ccpay-reports>
    <ccpay-refunds  *ngIf="viewName === 'remission'"></ccpay-refunds>
    `
})

export class PaymentLibComponent implements OnInit {
  @Input('API_ROOT') API_ROOT: string;
  @Input('BULKSCAN_API_ROOT') BULKSCAN_API_ROOT: string;
  @Input('REFUNDS_API_ROOT') REFUNDS_API_ROOT: string;
  @Input('CCD_CASE_NUMBER') CCD_CASE_NUMBER: string;
  @Input('EXC_REFERENCE') EXC_REFERENCE: string;
  @Input('PAYMENT_METHOD') PAYMENT_METHOD: string;
  @Input('VIEW') VIEW: string;
  @Input('VIEWSERVICE') VIEWSERVICE: string;
  @Input('PAYMENT_GROUP_REF') PAYMENT_GROUP_REF?: string;
  @Input('TAKEPAYMENT') TAKEPAYMENT: boolean;
  @Input('SERVICEREQUEST') SERVICEREQUEST: string;
  @Input('DCN_NUMBER') DCN_NUMBER: string;
  @Input('SELECTED_OPTION') SELECTED_OPTION: string;
  @Input('ISBSENABLE') ISBSENABLE: Boolean;
  @Input('ISSFENABLE') ISSFENABLE: boolean;
  @Input('ISTURNOFF') ISTURNOFF: boolean;
  @Input('CASETYPE') CASETYPE: string;
  @Input('ISOLDPCIPALOFF') ISOLDPCIPALOFF: boolean;
  @Input('ISNEWPCIPALOFF') ISNEWPCIPALOFF: boolean;

  paymentMethod: string;
  bspaymentdcn: string;
  unProcessedPaymentServiceId: string = null;
  paymentGroupReference: string;
  paymentReference: string;
  viewName: string;
  isTurnOff: boolean;
  caseType: string;
  isOldPcipalOff: boolean;
  isNewPcipalOff: boolean;
  unProcessedPayment: IBSPayments = null;

  constructor(private paymentLibService: PaymentLibService) { }

  ngOnInit() {
    this.paymentLibService.setApiRootUrl(this.API_ROOT);
    this.paymentLibService.setBulkScanApiRootUrl(this.BULKSCAN_API_ROOT);
    this.paymentLibService.setRefundndsApiRootUrl(this.REFUNDS_API_ROOT);
    if (this.PAYMENT_GROUP_REF) {
      this.paymentGroupReference = this.PAYMENT_GROUP_REF;
    }
    if (this.DCN_NUMBER) {
      this.bspaymentdcn = this.DCN_NUMBER;
    }
    if (this.VIEW === 'fee-summary') {
      this.viewName = 'fee-summary';
    } else  if (this.VIEW !== 'reports' && this.VIEW !== 'refund-list') {
      this.viewName = 'case-transactions';
    } else {
      this.viewName = this.VIEW;
    }
  }
}
