import { Component, OnInit, Input } from '@angular/core';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import { IFee } from '../../interfaces/IFee';
import { IPayment } from '../../interfaces/IPayment';
import { IRemission } from '../../interfaces/IRemission';
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';
import { ChangeDetectorRef } from '@angular/core';
import { OrderslistService } from '../../services/orderslist.service';

@Component({
  selector: 'ccpay-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  @Input() isTurnOff: boolean;
  @Input() isTakePayment: boolean;
  @Input() caseType: boolean;
  @Input() isNewPcipalOff: boolean;
  @Input() isOldPcipalOff: boolean;
  @Input() orderRef: boolean;
  @Input() orderStatus: boolean;
  @Input() orderTotalPayments: boolean;
  @Input() payment: IPayment;
  @Input('LOGGEDINUSERROLES') LOGGEDINUSERROLES: string[];

  paymentGroup: IPaymentGroup;
  errorMessage: string;
  ccdCaseNumber: string;
  selectedOption: string;
  dcnNumber: string;
  isStatusAllocated: boolean;
  isRemissionsMatch: boolean;
  feeId: IFee;
  viewStatus: string;
  isRefundRemission: boolean = false;
  isStrategicFixEnable: boolean;
  isAddFeeBtnEnabled: boolean = false;
  isIssueRefunfBtnEnable: boolean = false;
  allowedRolesToAccessRefund = ['payments-refund-approver', 'payments-refund'];
  remissions: IRemission[] = [];
  remissionFeeAmt: number;
  isRefundRemissionBtnEnable: boolean;

  constructor(private paymentViewService: PaymentViewService,
    private paymentLibComponent: PaymentLibComponent,
    private cd: ChangeDetectorRef,
    private OrderslistService: OrderslistService) {
  }

  ngOnInit() {
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.selectedOption = this.paymentLibComponent.SELECTED_OPTION;
    this.dcnNumber = this.paymentLibComponent.DCN_NUMBER;
    this.isTurnOff = this.paymentLibComponent.ISTURNOFF;
    this.viewStatus = 'paymentview';
    this.paymentViewService.getApportionPaymentDetails(this.paymentLibComponent.paymentReference).subscribe(
      paymentGroup => {
        let fees = [];
        paymentGroup.fees.forEach(fee => {
          this.isRemissionsMatch = false;

          paymentGroup.remissions.forEach(rem => {
            if (rem.fee_code === fee.code) {
              this.isRemissionsMatch = true;
              fee['remissions'] = rem;
              fees.push(fee);
            }
          });
          if (!this.isRemissionsMatch) {
            fees.push(fee);
          }
        });
        paymentGroup.fees = fees
        this.paymentGroup = paymentGroup;

        this.paymentGroup.payments = this.paymentGroup.payments.filter
          (paymentGroupObj => paymentGroupObj['reference'].includes(this.paymentLibComponent.paymentReference));
        const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
        this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
        console.log(this.paymentGroup.payments[0] + '1');
      },
      (error: any) => this.errorMessage = error
    );

  }

  get isCardPayment(): boolean {
    return this.paymentGroup.payments[0].method === 'card';
  }

  get isTelephonyPayment(): boolean {
    return this.paymentGroup.payments[0].channel === 'telephony';
  }

  public goToPaymentList(): void {
    this.paymentLibComponent.viewName = 'payment-list';
  }

  goToCaseTransationPage(event: any) {
    // event.preventDefault();
    this.OrderslistService.setnavigationPage('casetransactions');
    this.OrderslistService.setisFromServiceRequestPage(false);
    this.paymentLibComponent.viewName = 'case-transactions';
    this.paymentViewService.getBSfeature().subscribe(
      features => {
        let result = JSON.parse(features).filter(feature => feature.uid === BS_ENABLE_FLAG);
        this.paymentLibComponent.ISBSENABLE = result[0] ? result[0].enable : false;
      },
      err => {
        this.paymentLibComponent.ISBSENABLE = false;
      }
    );
  }

  addRemission(fee: IFee) {
    if(this.chkForAddRemission(fee.code)) {
    this.feeId = fee;
    this.paymentViewService.getApportionPaymentDetails(this.paymentGroup.payments[0].reference).subscribe(
      paymentGroup => {
        this.paymentGroup = paymentGroup;

        this.paymentGroup.payments = this.paymentGroup.payments.filter
          (paymentGroupObj => paymentGroupObj['reference'].includes(this.paymentLibComponent.paymentReference));
        this.payment = this.paymentGroup.payments[0];
        this.paymentLibComponent.isFromPaymentDetailPage = true;
        this.viewStatus = 'addremission';
        this.isRefundRemission = true;
        this.cd.detectChanges();
      },
      (error: any) => this.errorMessage = error
    );
    }
  }

  addRefundForRemission(payment: IPayment, remission: IRemission[],fees:any) {
 if(this.chkIsRefundRemissionBtnEnable()) {
    this.payment = payment;
    this.paymentViewService.getApportionPaymentDetails(this.payment.reference).subscribe(
      paymentGroup => {
        this.paymentGroup = paymentGroup;

        this.paymentGroup.payments = this.paymentGroup.payments.filter
          (paymentGroupObj => paymentGroupObj['reference'].includes(this.payment.reference));
        this.payment = this.paymentGroup.payments[0];
        this.remissions = remission;
        this.remissionFeeAmt = fees.filter(data=>data.code === this.remissions['fee_code'])[0].net_amount;
        this.viewStatus = 'addrefundforremission';
        // const paymentAllocation = this.paymentGroup.payments[0].payment_allocation;
        // this.isStatusAllocated = paymentAllocation.length > 0 && paymentAllocation[0].allocation_status === 'Allocated' || paymentAllocation.length === 0;
      },
      (error: any) => this.errorMessage = error
    );
 }
  }

  chkIsRefundRemissionBtnEnable(): boolean {
    this.paymentGroup.payments.forEach(payment => {
          if (payment.method.toLocaleLowerCase() === 'payment by account' && payment.status.toLocaleLowerCase() === 'success' && this.allowFurtherAccessAfter4Days(payment)) {
            this.isRefundRemissionBtnEnable = true;
          }
        });
    if (this.isRefundRemissionBtnEnable) {
      return true;
    } else {
      return false;
    };
  }

  issueRefund(paymentgrp: IPaymentGroup) {
    if(this.chkIssueRefundBtnEnable(paymentgrp.payments[0])) {
    this.paymentGroup = paymentgrp;
    this.viewStatus = 'issuerefund';
    this.isRefundRemission = true;
    }
  }

  getRemissionByFeeCode(feeCode: string, remissions: IRemission[]): IRemission {
    if (remissions && remissions.length > 0) {
      for (const remission of remissions) {
        if (remission.fee_code === feeCode) {
          return remission;
          // this.isAddFeeBtnEnabled = true;
        }
      }
    }
    return null;
  }

  chkIssueRefundBtnEnable(payment: IPayment): boolean {
    if (this.check4AllowedRoles2AccessRefund() && this.allowFurtherAccessAfter4Days(payment) &&
      payment.method === 'payment by account' && payment.status.toLocaleLowerCase() === 'success') {
      this.isIssueRefunfBtnEnable = true;
    }
    if (this.isIssueRefunfBtnEnable) {
      return true;
    } else {
      return false;
    };
  }

  chkForPBAPayment(): boolean {
    let payment = this.paymentGroup.payments[0];
    if (payment.method.toLocaleLowerCase() === 'payment by account' && this.allowFurtherAccessAfter4Days(payment)) {
      return true;
    }
    return false;
  }

  chkForAddRemission(feeCode: string): boolean {
    if (this.chkForPBAPayment() && this.check4AllowedRoles2AccessRefund() && this.allowFurtherAccessAfter4Days(this.paymentGroup.payments[0])) {
      if (this.paymentGroup.remissions && this.paymentGroup.remissions.length > 0) {
        for (const remission of this.paymentGroup.remissions) {
          if (remission.fee_code === feeCode) {
            return false;
          }
        }
        return true;
      }
      return true;

    } else {
      return false;
    }
  }

  check4AllowedRoles2AccessRefund = (): boolean => {
    return this.allowedRolesToAccessRefund.some(role =>
      this.LOGGEDINUSERROLES.indexOf(role) !== -1
    );
  }

  allowFurtherAccessAfter4Days = (payment: IPayment): boolean => {
    let tmp4DayAgo = new Date();
    tmp4DayAgo.setDate(tmp4DayAgo.getDate() - 4);
    return tmp4DayAgo >= new Date(payment.date_created);
  }
}