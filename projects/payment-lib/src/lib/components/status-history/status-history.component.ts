import { Component, OnInit, Input } from '@angular/core';
import { IStatusHistories } from '../../interfaces/IStatusHistories';
import { StatusHistoryService } from '../../services/status-history/status-history.service';
import type { PaymentLibComponent } from '../../payment-lib.component';
import { CommonModule } from '@angular/common';
type PaymentLibAlias = PaymentLibComponent;

@Component({
    selector: 'ccpay-payment-statuses',
    templateUrl: './status-history.component.html',
    styleUrls: ['./status-history.component.css'],
    imports: [CommonModule]
})
export class StatusHistoryComponent implements OnInit {
  @Input() isTakePayment: boolean;
  @Input() paymentLibComponent: PaymentLibAlias;
  pageTitle: string = 'Payment status history';
  statuses: IStatusHistories;
  errorMessage: string;

  constructor(private statusHistoryService: StatusHistoryService) { }

  ngOnInit() {
    this.statusHistoryService.getPaymentStatusesByReference(this.paymentLibComponent.paymentReference, this.paymentLibComponent.paymentMethod).subscribe(
      statuses => this.statuses = statuses,
      (error: any) => this.errorMessage = <any>error.replace(/"/g, "")
    );

  }

}
