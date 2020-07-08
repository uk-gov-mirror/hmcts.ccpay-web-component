import { Component, OnInit } from '@angular/core';
import {PaymentLibComponent} from '../../payment-lib.component';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import {CaseTransactionsService} from '../../services/case-transactions/case-transactions.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import {IFee} from '../../interfaces/IFee';
import {IPayment} from '../../interfaces/IPayment';
import {IRemission} from '../../interfaces/IRemission';
import {Router} from '@angular/router';

@Component({
  selector: 'ccpay-case-transactions',
  templateUrl: './case-transactions.component.html',
  styleUrls: ['./case-transactions.component.css']
})
export class CaseTransactionsComponent implements OnInit {
  takePayment: boolean;
  ccdCaseNumber: string;
  excReference: string;
  paymentGroups: any[] = [];
  payments: IPayment[] = [];
  nonPayments: IPayment[] = [];
  allPayments: IPayment[] = [];
  remissions: IRemission[] = [];
  fees: IFee[] = [];
  errorMessage: string;
  totalFees: number;
  totalPayments: number;
  totalNonOffPayments: number;
  totalRemissions: number;
  selectedOption: string;
  dcnNumber: string;
  paymentRef: string;
  isAddFeeBtnEnabled: boolean = true;
  isExceptionRecord: boolean = false;
  isUnprocessedRecordSelected: boolean = false;
  exceptionRecordReference: string;
  isAnyFeeGroupAvilable: boolean = true;
  isBulkScanEnable;
  viewStatus = 'main';
  isRemoveBtnDisabled: boolean = false;
  feeId:IFee;
  clAmountDue: number = 0;
  unprocessedRecordCount: number;
  constructor(private router: Router,
  private paymentViewService: PaymentViewService,
  private bulkScaningPaymentService: BulkScaningPaymentService,
  private caseTransactionsService: CaseTransactionsService,
  private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    if(this.paymentLibComponent.CCD_CASE_NUMBER === '') {
      this.ccdCaseNumber = this.paymentLibComponent.EXC_REFERENCE;
    }
    this.excReference = this.paymentLibComponent.EXC_REFERENCE;
    this.takePayment = this.paymentLibComponent.TAKEPAYMENT;
    this.isBulkScanEnable = this.paymentLibComponent.ISBSENABLE;

    this.caseTransactionsService.getPaymentGroups(this.ccdCaseNumber).subscribe(
      paymentGroups => {
        this.paymentGroups = paymentGroups['payment_groups'];
        this.calculateAmounts();
        this.calculateRefundAmount();
      },
      (error: any) => {
        this.errorMessage = <any>error;
        this.isAnyFeeGroupAvilable = false;
        this.setDefaults();
      }
    );

    this.dcnNumber = this.paymentLibComponent.DCN_NUMBER;
    this.selectedOption = this.paymentLibComponent.SELECTED_OPTION.toLocaleLowerCase();
    this.checkForExceptionRecord();
  }

  setDefaults(): void {
    this.totalPayments = 0.00;
    this.totalRemissions = 0.00;
    this.totalNonOffPayments = 0.00;
}
getAllocationStatus(payments: any){

  let paymentAllocation = payments.payment_allocation,
      isAllocationStatusExist = paymentAllocation.length >0;
  return isAllocationStatusExist ? paymentAllocation[0].allocation_status : '-';
  //return "-";

}

checkForExceptionRecord(): void {
  if(this.paymentGroups.length === 0 && this.selectedOption.toLocaleLowerCase() === 'ccdorexception') {
    this.bulkScaningPaymentService.getBSPaymentsByCCD(this.ccdCaseNumber).subscribe(
      recordData => {
       if(recordData['data'] && recordData['data'].exception_record_reference && recordData['data'].exception_record_reference.length > 0 && recordData['data'].ccd_reference >0) {
          this.isExceptionRecord = false;
          this.isAddFeeBtnEnabled = true;
        }

        if(recordData['data'] && recordData['data'].exception_record_reference && recordData['data'].exception_record_reference.length > 0 && recordData['data'].ccd_reference === undefined) {
          this.isExceptionRecord = true;
          this.isAddFeeBtnEnabled = false;
        }

        if(recordData['data'] && recordData['data'].exception_record_reference && recordData['data'].exception_record_reference.length === undefined && recordData['data'].ccd_reference >0) {
          this.isExceptionRecord = false;
          this.isAddFeeBtnEnabled = true;
        }
      });
  }

  if (this.paymentGroups.length === 0 && this.selectedOption.toLocaleLowerCase() === 'dcn') {
    if (this.paymentLibComponent.CCD_CASE_NUMBER.length > 0 && this.paymentLibComponent.EXC_REFERENCE.length > 0) {
      this.isExceptionRecord = false;
      this.isAddFeeBtnEnabled = true;
    } else if(this.paymentLibComponent.CCD_CASE_NUMBER.length === 0 && this.paymentLibComponent.EXC_REFERENCE.length > 0) {
      this.isExceptionRecord = true;
      this.isAddFeeBtnEnabled = false;
    } else {
      this.isExceptionRecord = false;
      this.isAddFeeBtnEnabled = true;
    }
  }
  if (this.paymentGroups.length > 0)
  this.paymentGroups.forEach(paymentGroup => {
    if (paymentGroup.payments) {
      this.nonPayments = paymentGroup.payments;
      paymentGroup.payments.forEach(payment => {
        if (payment.case_reference !== undefined && payment.case_reference.length > 0) {
          this.isExceptionRecord = true;
          this.isAddFeeBtnEnabled = false;
        } else {
          this.isExceptionRecord = false;
          this.isAddFeeBtnEnabled = true;
        }

      });
    }
  });
}

  calculateAmounts(): void {
    let paymentsTotal = 0.00,
     remissionsTotal = 0.00,
     nonOffLinePayment = 0.00;

    this.paymentGroups.forEach(paymentGroup => {
      if (paymentGroup.fees) {
        paymentGroup.fees.forEach(fee => {
          if(fee.date_created) {
            let a = fee.amount_due === undefined;
            let b = fee.amount_due < 0;
            this.clAmountDue = a ? this.clAmountDue + fee.net_amount : b ? this.clAmountDue + 0 : this.clAmountDue + fee.amount_due;
          }
          fee['payment_group_reference'] = paymentGroup['payment_group_reference'];
          this.fees.push(fee);
        });
      }

      if (paymentGroup.payments) {
        paymentGroup.payments.forEach(payment => {
          if (payment.status.toUpperCase() === 'SUCCESS') {
            paymentsTotal = paymentsTotal + payment.amount;
            let allocationLen = payment.payment_allocation;
            if(allocationLen.length === 0 || allocationLen.length > 0 && allocationLen[0].allocation_status ==='Allocated') {
              nonOffLinePayment = nonOffLinePayment + payment.amount;
            }
            this.payments.push(payment);
          }
          payment.paymentGroupReference = paymentGroup.payment_group_reference
          this.allPayments.push(payment);
        });
      }
      this.totalPayments = paymentsTotal;
      this.totalNonOffPayments = nonOffLinePayment;

      if (paymentGroup.remissions) {
        paymentGroup.remissions.forEach(remisison => {
          remissionsTotal = remissionsTotal + remisison.hwf_amount;
          this.remissions.push(remisison);
        });
      }
      this.totalRemissions = remissionsTotal;
    });

  }
  calculateRefundAmount() {
    let isNewPaymentGroup = false,
       isOldPaymentGroup = false;

    this.paymentGroups.forEach(paymentGroup => {
      let grpOutstandingAmount = 0.00,
        feesTotal = 0.00,
        paymentsTotal = 0.00,
        remissionsTotal = 0.00;
      if (paymentGroup.fees) {
        paymentGroup.fees.forEach(fee => {
          feesTotal = feesTotal + fee.calculated_amount;
          if(fee.date_created) {
            isNewPaymentGroup = true;
          }else {
            isOldPaymentGroup = true;
          }
        });
      }
      if (paymentGroup.payments) {
        paymentGroup.payments.forEach(payment => {
          if (payment.status.toUpperCase() === 'SUCCESS') {
            paymentsTotal = paymentsTotal + payment.amount;
          }
        });
      }

      if (paymentGroup.remissions) {
        paymentGroup.remissions.forEach(remission => {
          remissionsTotal = remissionsTotal + remission.hwf_amount;
        });
      }
        grpOutstandingAmount = (feesTotal - remissionsTotal) - paymentsTotal;
        if(grpOutstandingAmount > 0 && isNewPaymentGroup) {
          this.isAnyFeeGroupAvilable = true;
          this.paymentRef = paymentGroup.payment_group_reference;
        }
        if(grpOutstandingAmount <= 0 && isNewPaymentGroup) {
          this.isAnyFeeGroupAvilable = false;
        }
    });
    if((!isNewPaymentGroup && isOldPaymentGroup) || (!isNewPaymentGroup && !isOldPaymentGroup)) {
      this.isAnyFeeGroupAvilable = false;
    }
  }
  getGroupOutstandingAmount(paymentGroup: IPaymentGroup): number {
    return this.bulkScaningPaymentService.calculateOutStandingAmount(paymentGroup);;
  }

  redirectToFeeSearchPage(event: any) {
    event.preventDefault();
    if(!this.isAnyFeeGroupAvilable) {
    const url = this.isBulkScanEnable ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
    this.router.navigateByUrl(`/fee-search?selectedOption=${this.selectedOption}&ccdCaseNumber=${this.ccdCaseNumber}${url}`);
    } else {
      this.paymentLibComponent.bspaymentdcn = null;
      this.paymentLibComponent.paymentGroupReference = this.paymentRef;
      this.paymentLibComponent.viewName = 'fee-summary';
    }
  }

  redirectToReportsPage(event: any) {
    event.preventDefault();
    this.router.navigateByUrl(`/reports?selectedOption=${this.selectedOption}&ccdCaseNumber=${this.ccdCaseNumber}`);
  }
  loadFeeSummaryPage(paymentGroup: IPaymentGroup) {
    this.paymentLibComponent.bspaymentdcn = null;
    this.paymentLibComponent.paymentGroupReference = paymentGroup.payment_group_reference;
    this.paymentLibComponent.viewName = 'fee-summary';
  }

  goToPaymentViewComponent(paymentGroup: any) {
    this.paymentLibComponent.paymentMethod = paymentGroup.paymentMethod;
    this.paymentLibComponent.paymentGroupReference = paymentGroup.paymentGroupReference;
    this.paymentLibComponent.paymentReference = paymentGroup.paymentReference;
    this.paymentLibComponent.viewName = 'payment-view';
  }

  goToPayementView(paymentGroupReference: string, paymentReference: string, paymentMethod: string) {
    this.goToPaymentViewComponent({paymentGroupReference, paymentReference, paymentMethod});
  }

  selectedUnprocessedFeeEvent(unprocessedRecordId: string) {
    if ( unprocessedRecordId ) {
      this.isUnprocessedRecordSelected = true;
    } else {
      this.isUnprocessedRecordSelected = false;
    }
  }
  getUnprocessedFeeCount(unProcessedRecordCount: number) {
    this.unprocessedRecordCount = unProcessedRecordCount;
  }

  calculateAmountDue(fee: IFee) {

    if(fee.date_created) {
      return fee.amount_due ? fee.amount_due : fee.net_amount;
    } else {
      return "0.00";
    }
  }

  confirmRemoveFee(fee: IFee){
    this.isRemoveBtnDisabled = false;
    this.feeId = fee;
    this.viewStatus = 'feeRemovalConfirmation';
  }
  cancelRemoval() {
    this.viewStatus = 'main';
  }
  removeFee(fee: any){
    this.isRemoveBtnDisabled = true;
    this.paymentViewService.deleteFeeFromPaymentGroup(fee).subscribe(
      (success: any) => {
        window.location.reload();
      },
      (error: any) => {
          this.errorMessage = error;
          this.isRemoveBtnDisabled = false;
      }
    );
  }

  isCheckAmountdueExist(amountDue: any) {
    return typeof amountDue === 'undefined';
  }
}
