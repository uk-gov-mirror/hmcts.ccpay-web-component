import { Component, OnInit } from '@angular/core';

import {PaymentViewService} from '../../services/payment-view/payment-view.service';
import {IPayment} from '../../interfaces/IPayment';
import { PaymentLibComponent } from '../../payment-lib.component';

@Component({
  selector: 'ccpay-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  pageTitle: string = 'Payment summary';
  payment: IPayment;
  errorMessage: string;

  constructor(private paymentViewService: PaymentViewService,
              private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.paymentViewService.getPaymentDetails(this.paymentLibComponent.paymentReference).subscribe(
      payment => this.payment = payment,
      (error: any) => this.errorMessage = <any>error
    );
  }

  get isCardPayment(): boolean {
    return this.payment.method === 'card';
  }

  public goToPaymentList(): void {
    this.paymentLibComponent.viewName = 'payment-list';
  }

}
