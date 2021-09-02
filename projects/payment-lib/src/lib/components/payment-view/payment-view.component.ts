import {Component, OnInit, Input} from '@angular/core';
import {PaymentViewService} from '../../services/payment-view/payment-view.service';
import {PaymentLibComponent} from '../../payment-lib.component';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import {IFee} from '../../interfaces/IFee';
import { IPayment } from '../../interfaces/IPayment';
import {IRemission} from '../../interfaces/IRemission';
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';
import {ChangeDetectorRef} from '@angular/core';

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

  paymentGroup: IPaymentGroup;
  errorMessage: string;
  ccdCaseNumber: string;
  selectedOption: string;
  dcnNumber: string;
  isStatusAllocated: boolean;
  isRemissionsMatch: boolean;
  feeId:IFee;
  viewStatus: string;
  isRefundRemission: boolean = false;
  isStrategicFixEnable: boolean;
  isAddFeeBtnEnabled: boolean = false;
  isIssueRefunfBtnEnable: boolean = false;

  constructor(private paymentViewService: PaymentViewService,
              private paymentLibComponent: PaymentLibComponent,
              private cd: ChangeDetectorRef) {
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
            if(rem.fee_code === fee.code) {
              this.isRemissionsMatch = true;
              fee['remissions'] = rem;
              fees.push(fee);
            }
          });
          if(!this.isRemissionsMatch) {
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
    event.preventDefault()
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
    this.feeId = fee;
    this.paymentViewService.getApportionPaymentDetails(this.paymentGroup.payments[0].reference).subscribe(
      paymentGroup => {
        this.paymentGroup = paymentGroup;

        this.paymentGroup.payments = this.paymentGroup.payments.filter
        (paymentGroupObj => paymentGroupObj['reference'].includes(this.paymentLibComponent.paymentReference));
        this.payment = this.paymentGroup.payments[0];
        this.viewStatus = 'addremission';
        this.isRefundRemission = true;
        this.cd.detectChanges();
      },  
      (error: any) => this.errorMessage = error
    );
  }

  issueRefund(paymentgrp: IPaymentGroup ) {
    this.paymentGroup = paymentgrp;
    this.viewStatus = 'issuerefund';
    this.isRefundRemission = true;
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

chkIssueRefundBtnEnable(payment: IPayment):boolean {
  if(payment.method === 'payment by account' && payment.status === 'Success') {
    this.isIssueRefunfBtnEnable = true;
  }
  if (this.isIssueRefunfBtnEnable) {
    return true;
  } else {
  return false; 
  };
}

chkForPBAPayment():boolean {
  
  if (this.paymentGroup.payments[0].method.toLocaleLowerCase() === 'payment by account') {
    return true;
  }
  return false;
}

chkForAddRemission(feeCode: string): boolean {
  if(this.chkForPBAPayment()) {
    if (this.paymentGroup.remissions && this.paymentGroup.remissions.length > 0) {
      for (const remission of this.paymentGroup.remissions) {
        if (remission.fee_code === feeCode) {
          return false;
        }
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
    
}
}