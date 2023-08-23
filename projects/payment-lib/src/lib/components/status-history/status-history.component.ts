import { Inject, Component, OnInit, Input } from '@angular/core';
import { IStatusHistories } from '../../interfaces/IStatusHistories';
import { StatusHistoryService } from '../../services/status-history/status-history.service';

// Import ParentComponent as a type only to fix NG3003.
// import { PaymentLibComponent } from '../../payment-lib.component';
import type { PaymentLibComponent } from '../../payment-lib.component';
import { PAYMENT_LIB_COMPONENT } from '../../payment-lib.token';

@Component({
  selector: 'ccpay-payment-statuses',
  templateUrl: './status-history.component.html',
  styleUrls: ['./status-history.component.css']
})
export class StatusHistoryComponent implements OnInit {
  @Input() isTakePayment: boolean;
  pageTitle: string = 'Payment status history';
  statuses: IStatusHistories;
  errorMessage: string;

  constructor(private statusHistoryService: StatusHistoryService,
              @Inject(PAYMENT_LIB_COMPONENT) private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.statusHistoryService.getPaymentStatusesByReference(this.paymentLibComponent.paymentReference, this.paymentLibComponent.paymentMethod).subscribe(
      statuses => this.statuses = statuses,
      (error: any) => this.errorMessage = <any>error.replace(/"/g,"")
    );

  }

}
