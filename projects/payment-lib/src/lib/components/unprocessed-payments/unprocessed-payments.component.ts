import { Component, OnInit } from '@angular/core';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentLibComponent } from '../../payment-lib.component';

@Component({
  selector: 'app-unprocessed-payments',
  templateUrl: './unprocessed-payments.component.html',
  styleUrls: ['./unprocessed-payments.component.scss']
})
export class UnprocessedPaymentsComponent implements OnInit {
  viewStatus = 'main';
  constructor(private bulkScaningPaymentService: BulkScaningPaymentService,
    private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    //Todo ...
  }
}
