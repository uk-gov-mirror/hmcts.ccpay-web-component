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

  goToCcdSearch(): void {
    console.log('.....goToCcdSearch()......');
    this.http.get(`${this.paymentLibComponent.API_ROOT}/ccd-search/${this.paymentLibComponent.CCD_CASE_NUMBER}`, {
      withCredentials: true
    });
  }

  goToAddFee(): void {
    console.log('.....goToAddFee()......');
    this.http.get(`${this.paymentLibComponent.API_ROOT}/fees`, {
      withCredentials: true
    });
  }
}
