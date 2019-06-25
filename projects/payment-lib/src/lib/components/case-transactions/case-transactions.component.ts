import { Component, OnInit } from '@angular/core';
import {PaymentLibComponent} from '../../payment-lib.component';
import {HttpClient} from '@angular/common/http';
import {PaymentListService} from '../../services/payment-list/payment-list.service';
import {IPayments} from '../../interfaces/IPayments';

@Component({
  selector: 'ccpay-case-transactions',
  templateUrl: './case-transactions.component.html',
  styleUrls: ['./case-transactions.component.css']
})
export class CaseTransactionsComponent implements OnInit {
  ccdCaseNumber: string;
  payments: IPayments;
  errorMessage: string;
  code: string;

  constructor(private paymentListService: PaymentListService,
              private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;

    this.paymentListService.getPaymentByCcdCaseNumber(this.paymentLibComponent.CCD_CASE_NUMBER, this.paymentLibComponent.PAYMENT_METHOD)
      .subscribe(
        payments => this.payments = payments,
        (error: any) => this.errorMessage = <any>error
      );
  }
}
