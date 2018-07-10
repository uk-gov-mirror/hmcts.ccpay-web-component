import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PaymentListService } from '../../services/payment-list/payment-list.service';
import { IPayment } from '../../interfaces/IPayment';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  pageTitle: string = 'Case payments';
  payment: IPayment;

  constructor(private paymentListService: PaymentListService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log('Payments for the case number: ', params);
      this.paymentListService.getPaymentByReference(params.paymentReference).subscribe(
        payment => this.payment = payment
      );
    });
  }

}
