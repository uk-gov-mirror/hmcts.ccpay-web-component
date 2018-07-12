import { Component, OnInit } from '@angular/core';

import {PaymentViewService} from '../../services/payment-view/payment-view.service';
import {ActivatedRoute} from '@angular/router';
import {IPayment} from '../../interfaces/IPayment';

@Component({
  selector: 'ccpay-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  pageTitle: string = 'Payment summary';
  payment: IPayment;

  constructor(private paymentViewService: PaymentViewService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.paymentViewService.getPaymentDetails(params.paymentReference).subscribe(
        payment => this.payment = payment
      );
    });
  }

  get isCardPayment(): boolean {
    return this.payment.method === 'card';
  }

}
