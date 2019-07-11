import { Component, OnInit, Input } from '@angular/core';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IRemission } from '../../interfaces/IRemission';
import { IFee } from '../../interfaces/IFee';
import { ConsoleLoggerService } from '../../services/shared/logger/console-logger.service';

@Component({
  selector: 'ccpay-fee-summary',
  templateUrl: './fee-summary.component.html',
  styleUrls: ['./fee-summary.component.scss']
})

export class FeeSummaryComponent implements OnInit {
  @Input() paymentGroupRef: string;

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
    // this.feeRegisterSearchService.setURL(this.feeAPIRoot);
    // this.feeRegisterSearchService.getFees()
    //   .subscribe(
    //     (fees: IFee[]) => this.fees = fees
    // );

    // if (!this.paymentLibComponent.paymentGroupReference) {
    //   this.paymentLibComponent.paymentGroupReference = '2018-15310089885';
    // }

    this.viewStatus = 'main';

    this.paymentViewService.getPaymentGroupDetails(this.paymentLibComponent.paymentGroupReference,
      this.paymentLibComponent.paymentMethod).subscribe(
      paymentGroup => {
        this.paymentGroup = paymentGroup;
        this.totalFee = 0;
        if (this.paymentGroup.fees) {
          this.paymentGroup.fees.forEach(function(fee) {
            this.totalFee += fee.net_amount;
          });
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

  // getFeeByFeeCode(feeCode: string): IFee {
  //   if (this.paymentGroup && this.fees && this.fees.length > 0) {
  //     for (const fee of this.fees) {
  //       if (fee.code === feeCode) {
  //         return fee;
  //       }
  //     }
  //   }
  //   return null;
  // }

  addRemission(fee: IFee) {
    console.log('add remission');
    console.log(fee);
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
