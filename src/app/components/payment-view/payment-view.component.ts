import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentDetails } from '../../interfaces/IPaymentDetails';
import { PaymentViewService  } from '../../services/payment-view/payment-view.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  pageTitle: string = 'Payment details'
  paymentDetails: IPaymentDetails;

  constructor(private activatedRoute: ActivatedRoute,
              private paymentSerivce: PaymentViewService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {
      console.log('Payment details for the reference: ', params);
      this.paymentDetails = this.paymentSerivce.getPaymentDetails().filter((p) => {
        return p.payment.paymentReference === params.paymentReference;
      })[0];
    });
  }

}
