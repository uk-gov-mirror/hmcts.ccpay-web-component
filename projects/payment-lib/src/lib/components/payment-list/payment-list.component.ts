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
  paymentReference: string;
  paymentMethod: string;
  errorMessage: string;

  constructor(private paymentListService: PaymentListService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.paymentMethod = this.activatedRoute.snapshot.queryParams['payment_method'];
      console.log('Payment-list-component ccdCaseNumber: ', params.ccdCaseNumber);
      console.log('Payment-list-component paymentMethod: ', this.paymentMethod);
      this.paymentReference = params.paymentReference;
      this.paymentListService.getPaymentByCcdCaseNumber(params.ccdCaseNumber, this.paymentMethod).subscribe(
        payments => this.payments = payments,
        (error: any) => this.errorMessage = <any>error
      );
    });
  }
}
