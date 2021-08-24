import {Component, OnInit, Input} from '@angular/core';
import {RefundsService} from '../../services/refunds/refunds.service';
import {PaymentLibComponent} from '../../payment-lib.component';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';

@Component({
  selector: 'ccpay-process-refund',
  templateUrl: './process-refund.component.html',
  styleUrls: ['./process-refund.component.css']
})
export class ProcessRefundComponent implements OnInit {
  @Input() isTurnOff: boolean;
  @Input() isTakePayment: boolean;

  paymentGroup: IPaymentGroup;
  errorMessage: string;
  viewStatus: string;


  constructor(private RefundsService: RefundsService,
              private paymentLibComponent: PaymentLibComponent) {
  }

  ngOnInit() {
    this.viewStatus = 'RefundProcess';

   
  }

  get isCardPayment(): boolean {
    return this.paymentGroup.payments[0].method === 'card';
  }

  get isTelephonyPayment(): boolean {
    return this.paymentGroup.payments[0].channel === 'telephony';
  }

  public goToPaymentList(): void {
    this.paymentLibComponent.viewName = 'payment-list';
  }
}
