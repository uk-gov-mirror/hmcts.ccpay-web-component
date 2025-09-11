import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentLibComponent } from '../../../../projects/payment-lib/src/lib/payment-lib.component';

@Component({
    selector: 'app-payment-lib-int',
    templateUrl: './payment-lib-int.component.html',
    styleUrls: ['./payment-lib-int.component.css'],
    standalone: true,
    imports: [CommonModule, PaymentLibComponent]
})
export class PaymentLibIntComponent implements OnInit {
  ccdCaseNumber: string;
  paymentMethod: string;
  apiRoot: string;
  view: string;
  takePayment: boolean;
  dcnNumber: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.ccdCaseNumber = params.ccdCaseNumber;
      this.view = this.activatedRoute.snapshot.queryParams['view'];
      this.dcnNumber = this.activatedRoute.snapshot.queryParams['dcn'];
      this.takePayment = this.activatedRoute.snapshot.queryParams['takePayment'];
      this.apiRoot = 'http://localhost:9999';
    });
  }

}
