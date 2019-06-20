import { Component, OnInit } from '@angular/core';
import {PaymentLibComponent} from '../../payment-lib.component';

@Component({
  selector: 'ccpay-case-transactions',
  templateUrl: './case-transactions.component.html',
  styleUrls: ['./case-transactions.component.css']
})
export class CaseTransactionsComponent implements OnInit {

  constructor(private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
  }
}
