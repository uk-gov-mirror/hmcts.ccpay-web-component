import { Component, OnInit, Input } from '@angular/core';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IRemission } from '../../interfaces/IRemission';

@Component({
  selector: 'ccpay-fee-summary',
  templateUrl: './fee-summary.component.html',
  styleUrls: ['./fee-summary.component.scss']
})
export class FeeSummaryComponent implements OnInit {
  @Input() paymentGroupRef: string;
  
  paymentGroup: IPaymentGroup;
  errorMessage: string;

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

    this.paymentLibComponent.paymentGroupReference = '2018-15310089885';

    this.paymentViewService.getPaymentGroupDetails(this.paymentLibComponent.paymentGroupReference,
      this.paymentLibComponent.paymentMethod).subscribe(
      paymentGroup => this.paymentGroup = paymentGroup,
      (error: any) => this.errorMessage = <any>error
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

}
