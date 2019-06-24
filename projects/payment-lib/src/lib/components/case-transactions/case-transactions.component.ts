import { Component, OnInit } from '@angular/core';
import {PaymentLibComponent} from '../../payment-lib.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ccpay-case-transactions',
  templateUrl: './case-transactions.component.html',
  styleUrls: ['./case-transactions.component.css']
})
export class CaseTransactionsComponent implements OnInit {
  ccdCaseNumber: string;

  constructor(private paymentLibComponent: PaymentLibComponent,
              private http: HttpClient) { }

  ngOnInit() {
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
  }
}
