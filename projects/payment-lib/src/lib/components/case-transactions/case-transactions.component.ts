import { Component, OnInit } from '@angular/core';
import {PaymentLibComponent} from '../../payment-lib.component';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ccpay-case-transactions',
  templateUrl: './case-transactions.component.html',
  styleUrls: ['./case-transactions.component.css']
})
export class CaseTransactionsComponent implements OnInit {
  ccdCaseNumber: string;

  constructor(private paymentLibComponent: PaymentLibComponent,
              private router: Router) { }

  ngOnInit() {
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
  }

  goToCcdSearch(): void {
    console.log('.....goToCcdSearch()......');
    this.router.navigate([`/ccd-search/${this.ccdCaseNumber}`]);
  }

  goToAddFee(): void {
    console.log('.....goToAddFee()......');
    this.router.navigate(['/fees']);
  }
}
