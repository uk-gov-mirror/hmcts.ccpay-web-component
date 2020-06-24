import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-lib-int',
  templateUrl: './payment-lib-int.component.html',
  styleUrls: ['./payment-lib-int.component.css']
})
export class PaymentLibIntComponent implements OnInit {
  ccdCaseNumber: string;
  paymentMethod: string;
  paymentGroupRef: string;
  bulkscanapiRoot: string;
  isBulkscanningEnable: boolean;
  selectedOption: string;
  apiRoot: string;
  view: string;
  takePayment: boolean;
  dcnNumber: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.apiRoot = 'http://localhost:9999';
      this.bulkscanapiRoot = 'http://localhost:9999';
      this.ccdCaseNumber = params['ccdCaseNumber'];
      this.isBulkscanningEnable = this.activatedRoute.snapshot.queryParams['isBulkScanning'] === 'Enable';
      this.view = this.activatedRoute.snapshot.queryParams['view'];
      this.takePayment = this.activatedRoute.snapshot.queryParams['takePayment'];
      this.paymentGroupRef = this.activatedRoute.snapshot.queryParams['paymentGroupRef'];
      this.dcnNumber = this.activatedRoute.snapshot.queryParams['dcn'];
      this.selectedOption = this.activatedRoute.snapshot.queryParams['selectedOption'];
    });
  }

}
