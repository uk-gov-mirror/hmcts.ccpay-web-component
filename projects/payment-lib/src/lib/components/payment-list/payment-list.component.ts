import { Component, OnInit } from '@angular/core';

import { PaymentListService } from '../../services/payment-list/payment-list.service';
import { IPayments } from '../../interfaces/IPayments';
import { PaymentLibService } from '../../payment-lib.service'
import { PaymentLibComponent } from '../../payment-lib.component'

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
              private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.paymentListService.getPaymentByCcdCaseNumber(this.paymentLibComponent.CCD_CASE_NUMBER, this.paymentLibComponent.PAYMENT_METHOD)
      .subscribe(
      payments => this.payments = payments,
      (error: any) => this.errorMessage = <any>error
    );
  }


  loadPaymentViewComponent(paymentReference: string) {
    this.paymentLibComponent.paymentReference = paymentReference;
    this.paymentLibComponent.viewName = 'payment-view';
  }
}
