import { Component, OnInit } from '@angular/core';
import {PaymentLibComponent} from '../../payment-lib.component';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import {CaseTransactionsService} from '../../services/case-transactions/case-transactions.service';
import {IFee} from '../../interfaces/IFee';
import {IPayment} from '../../interfaces/IPayment';
import {IRemission} from '../../interfaces/IRemission';
import {Router} from '@angular/router';
import {PaymentListComponent} from '../payment-list/payment-list.component';

@Component({
  selector: 'ccpay-case-transactions',
  templateUrl: './case-transactions.component.html',
  styleUrls: ['./case-transactions.component.css']
})
export class CaseTransactionsComponent implements OnInit {
  takePayment: boolean;
  ccdCaseNumber: string;
  paymentGroups: IPaymentGroup[] = [];
  payments: IPayment[] = [];
  remissions: IRemission[] = [];
  fees: IFee[] = [];
  errorMessage: string;
  totalFees: number;
  totalPayments: number;
  totalRemissions: number;
  selectedOption: string;
  dcnNumber: string;
  isAddFeeBtnEnabled: boolean = true;
  exceptionRecordReference: string;
  isPaymentRecordsExist: boolean = false;

    constructor(private router: Router,
    private caseTransactionsService: CaseTransactionsService,
    private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.takePayment = this.paymentLibComponent.TAKEPAYMENT;
    this.caseTransactionsService.getPaymentGroups(this.ccdCaseNumber).subscribe(
      paymentGroups => {
        this.paymentGroups = paymentGroups['payment_groups'];
        this.isPaymentRecordsExist =  this.paymentGroups.length === 0;
        this.calculateAmounts();
      },
      (error: any) => {
        this.errorMessage = <any>error;
        this.setDefaults();
      }
    );
    this.dcnNumber = this.paymentLibComponent.DCN_NUMBER;
    this.selectedOption = this.paymentLibComponent.SELECTED_OPTION.toLocaleLowerCase();
  }

  setDefaults(): void {
    this.totalPayments = 0.00;
    this.totalRemissions = 0.00;
    this.totalFees = 0.00;
}

  calculateAmounts(): void {
    let feesTotal = 0.00;
    let paymentsTotal = 0.00;
    let remissionsTotal = 0.00;

    this.paymentGroups.forEach(paymentGroup => {
      if (paymentGroup.fees) {
        paymentGroup.fees.forEach(fee => {
          feesTotal = feesTotal + fee.calculated_amount;
          this.fees.push(fee);
        });
      }
      this.totalFees = feesTotal;

      if (paymentGroup.payments) {
        paymentGroup.payments.forEach(payment => {
          if (payment.status.toUpperCase() === 'SUCCESS') {
            paymentsTotal = paymentsTotal + payment.amount;
            this.payments.push(payment);
          }
        });
      }
      this.totalPayments = paymentsTotal;

      if (paymentGroup.remissions) {
        paymentGroup.remissions.forEach(remisison => {
          remissionsTotal = remissionsTotal + remisison.hwf_amount;
          this.remissions.push(remisison);
        });
      }
      this.totalRemissions = remissionsTotal;
    });

  }

  getGroupOutstandingAmount(paymentGroup: IPaymentGroup): number {
    let feesTotal = 0.00;
    let paymentsTotal = 0.00;
    let remissionsTotal = 0.00;

    if (paymentGroup.fees) {
      paymentGroup.fees.forEach(fee => {
        feesTotal = feesTotal + fee.calculated_amount;
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

    return (feesTotal - remissionsTotal) - paymentsTotal;
  }

  redirectToFeeSearchPage(event: any) {
    event.preventDefault();
    this.router.navigateByUrl(`/fee-search?selectedOption=${this.selectedOption}&ccdCaseNumber=${this.ccdCaseNumber}`);
  }

  loadFeeSummaryPage(paymentGroup: IPaymentGroup) {
    this.paymentLibComponent.paymentGroupReference = paymentGroup.payment_group_reference;
    this.paymentLibComponent.viewName = 'fee-summary';
  }

  goToPaymentViewComponent(paymentGroupReference: string, paymentReference: string, paymentMethod: string) {
    this.paymentLibComponent.paymentMethod = paymentMethod;
    this.paymentLibComponent.paymentGroupReference = paymentGroupReference;
    this.paymentLibComponent.paymentReference = paymentReference;
    this.paymentLibComponent.viewName = 'payment-view';
  }

  selectedUnprocessedFeeEvent(unprocessedRecordId: string) {
    if ( unprocessedRecordId.length > 0) {
      this.isAddFeeBtnEnabled = false;
    }
  }
}
