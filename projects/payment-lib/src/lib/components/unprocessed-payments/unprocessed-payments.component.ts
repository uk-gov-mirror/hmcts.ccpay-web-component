import { Component, OnInit } from '@angular/core';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IBSPayments } from '../../interfaces/IBSPayments';

@Component({
  selector: 'app-unprocessed-payments',
  templateUrl: './unprocessed-payments.component.html',
  styleUrls: ['./unprocessed-payments.component.scss']
})
export class UnprocessedPaymentsComponent implements OnInit {
  viewStatus = 'main';
  unassignedRecordList: IBSPayments;
  errorMessage: string;
  ccdCaseNumber:string;
  recordId: string = null;

  constructor(private bulkScaningPaymentService: BulkScaningPaymentService,
    private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    //Todo ...
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.getUnassignedPaymentlist();

  }

  getUnassignedPaymentlist() {
    this.bulkScaningPaymentService.getBSPayments(`CCD-${this.ccdCaseNumber}`).subscribe(
      unassignedPayments => {
       this.unassignedRecordList = unassignedPayments['unassigned_payments'];
      },
      (error: any) => this.errorMessage = error
    );
  }
  formatUnassignedRecordId(ID: Number){
    return `unassignrecord-${ID}`;
  }
  loadUnsolicitedPage(viewName: string) {
    alert(this.recordId);
    this.paymentLibComponent.bspaymentdcn = `DCN-${this.ccdCaseNumber}`;
    this.paymentLibComponent.viewName = viewName;
  }
}
