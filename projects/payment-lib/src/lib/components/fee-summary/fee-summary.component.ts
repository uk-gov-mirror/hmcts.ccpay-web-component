import { Component, OnInit, Input } from '@angular/core';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IRemission } from '../../interfaces/IRemission';
import { IFee } from '../../interfaces/IFee';
import { PaymentToPayhubRequest } from '../../interfaces/PaymentToPayhubRequest';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ccpay-fee-summary',
  templateUrl: './fee-summary.component.html',
  styleUrls: ['./fee-summary.component.scss']
})

export class FeeSummaryComponent implements OnInit {
  @Input() paymentGroupRef: string;
  @Input() ccdCaseNumber: string;

  paymentGroup: IPaymentGroup;
  errorMessage: string;
  viewStatus = 'main';
  currentFee: IFee;
  totalFee: number;
  payhubHtml: SafeHtml;

  constructor(
    private paymentViewService: PaymentViewService,
    private paymentLibComponent: PaymentLibComponent
  ) {}

  ngOnInit() {
    this.viewStatus = 'main';
    console.log(this.ccdCaseNumber);
    console.log(this.paymentGroupRef);

   // this.paymentGroupRef = '2018-15310089885';
  //  this.paymentGroupRef = '2019-15496299273';
  //this.paymentGroupRef = '2019-15573125981';

    this.paymentViewService.getPaymentGroupDetails(this.paymentGroupRef,
      this.paymentLibComponent.paymentMethod).subscribe(
      paymentGroup => {
        this.paymentGroup = paymentGroup;
        this.totalFee = 0;
        if (this.paymentGroup.fees) {
          for (const fee of this.paymentGroup.fees) {
            this.totalFee = this.totalFee + fee.net_amount;
          }
        }
      },
      (error: any) => this.errorMessage = error
    );
  }

  getRemissionByFeeCode(feeCode: string): IRemission {
    if (this.paymentGroup && this.paymentGroup.remissions && this.paymentGroup.remissions.length > 0) {
      for (const remission of this.paymentGroup.remissions) {
        if (remission.fee_code === feeCode) {
          return remission;
        }
      }
    }
    return null;
  }

  addRemission(fee: IFee) {
    this.currentFee = fee;
    this.viewStatus = 'add_remission';
  }

  cancelRemission() {
    this.viewStatus = 'main';
  }

  takePayment() {
    console.log('take payment');
    const requestBody = new PaymentToPayhubRequest(this.ccdCaseNumber, this.paymentGroup.fees, this.totalFee);
    console.log(requestBody);
    this.paymentViewService.postPaymentToPayHub(requestBody).subscribe(
      response => {
        console.log('send to pay hub success');
        console.log(response);
        this.payhubHtml = response;
        this.viewStatus = 'payhub_view';
      },
      (error: any) => {
        console.log(error);
        this.errorMessage = error;
      }
    );
  }

  takePaymentUsingPromise() {
    console.log('take payment Promise');
    const requestBody = new PaymentToPayhubRequest(this.ccdCaseNumber, this.paymentGroup.fees, this.totalFee);
    console.log(requestBody);
    this.paymentViewService.postPaymentToPayHubPromise(requestBody).then(
      resp => {
        console.log('send to pay hub success using promise');
        console.log(resp);
        this.payhubHtml = resp;
        this.viewStatus = 'payhub_view';
      },
      (error: any) => {
        console.log(error);
        this.errorMessage = error;
      }
    );
  }
}
