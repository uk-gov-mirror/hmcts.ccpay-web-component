import { Component, OnInit } from '@angular/core';
import {PaymentLibComponent} from '../../payment-lib.component';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import {CaseTransactionsService} from '../../services/case-transactions/case-transactions.service';
import {IFee} from '../../interfaces/IFee';
import {IPayment} from '../../interfaces/IPayment';
import {IRemission} from '../../interfaces/IRemission';

@Component({
  selector: 'ccpay-case-transactions',
  templateUrl: './case-transactions.component.html',
  styleUrls: ['./case-transactions.component.css']
})
export class CaseTransactionsComponent implements OnInit {
  ccdCaseNumber: string;
  paymentGroups: IPaymentGroup[] = [];
  payments: IPayment[] = [];
  remissions: IRemission[] = [];
  fees: IFee[] = [];
  errorMessage: string;

  constructor(private caseTransactionsService: CaseTransactionsService,
              private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;

    this.caseTransactionsService.getPaymentGroups(this.ccdCaseNumber).subscribe(
      paymentGroups => {
        this.paymentGroups = paymentGroups;
        this.loadData();
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  loadData(): void {
    this.paymentGroups.forEach(paymentGroup => {
      if (paymentGroup.fees) {
        paymentGroup.fees.forEach(fee => this.fees.push(fee));
      }

      if (paymentGroup.payments) {
        paymentGroup.payments.forEach(payment => this.payments.push(payment));
      }

      if (paymentGroup.remissions) {
        paymentGroup.remissions.forEach(remisison => this.remissions.push(remisison));
      }
    });
  }

}
