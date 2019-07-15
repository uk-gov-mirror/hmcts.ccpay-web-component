import { Component, OnInit, Input } from '@angular/core';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IRemission } from '../../interfaces/IRemission';
import { IFee } from '../../interfaces/IFee';

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

  constructor(
    private paymentViewService: PaymentViewService,
    private paymentLibComponent: PaymentLibComponent
  ) {}

  ngOnInit() {
    this.viewStatus = 'main';
    console.log(this.ccdCaseNumber);
    console.log(this.paymentGroupRef);

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

  editRemission(fee: IFee) {
    console.log('edit remission');
  }

  cancelRemission() {
    this.viewStatus = 'main';
  }
}
