import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PaymentListService } from '../../services/payment-list/payment-list.service';
import { IPayments } from '../../interfaces/IPayments';

@Component({
  selector: 'ccpay-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  pageTitle: string = 'Case payments';
  payments: IPayments;
  paymentMethod: string;
  errorMessage: string;

  constructor(private paymentListService: PaymentListService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.paymentMethod = this.activatedRoute.snapshot.queryParams['paymentMethod'];
      console.log('PaymentListComponent ccdCaseNumber: ', params.ccdCaseNumber, ' and paymentMethod: ', this.paymentMethod);
      this.paymentListService.getPaymentByCcdCaseNumber(params.ccdCaseNumber, this.paymentMethod).subscribe(
        payments => this.payments = payments,
        (error: any) => this.errorMessage = <any>error
      );
    });
  }

}
