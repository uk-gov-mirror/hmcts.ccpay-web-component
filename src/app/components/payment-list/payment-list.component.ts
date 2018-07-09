import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PaymentListService } from '../../services/payment-list/payment-list.service';
import { ICasePayments } from '../../interfaces/ICasePayments';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  pageTitle: string = 'Case payments';
  casePayments: ICasePayments;

  constructor(private paymentListService: PaymentListService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log('Payments for the case number: ', params);
      this.casePayments = this.paymentListService.getPayments().filter((p) => {
        return p.caseNumber === params.caseNumber;
      })[0];
    });
  }

}
