import { Component, OnInit } from '@angular/core';

import { PaymentListService } from '../../services/payment-list/payment-list.service';
import { IPayments } from '../../interfaces/IPayments';
import { PaymentLibComponent } from '../../payment-lib.component';
import {IStatusHistory} from '../../interfaces/IStatusHistory';

@Component({
  selector: 'ccpay-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: IPayments;
  errorMessage: string;
  code: string;

  constructor(private paymentListService: PaymentListService,
              private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.paymentListService.getPaymentByCcdCaseNumber(this.paymentLibComponent.CCD_CASE_NUMBER, this.paymentLibComponent.PAYMENT_METHOD)
      .subscribe(
      payments => this.payments = payments,
      (error: any) => this.errorMessage = <any>error
    );
  }

  getFailureReasonCode(statusHistories: IStatusHistory[]) {
    for (const statusHistory of statusHistories) {
      if (statusHistory.external_status === 'failed') {
        this.code = statusHistory.error_code;
      }
    }
  }

  loadPaymentViewComponent(paymentReference: string, paymentMethod: string) {
    this.paymentLibComponent.paymentMethod = paymentMethod;
    this.paymentLibComponent.paymentReference = paymentReference;
    this.paymentLibComponent.viewName = 'payment-view';
  }
}
