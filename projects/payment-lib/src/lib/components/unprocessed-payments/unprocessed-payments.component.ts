import { Component, OnInit } from '@angular/core';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IBSPayments } from '../../interfaces/IBSPayments';
import {Router} from '@angular/router';

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
  isRecordExist: boolean = false;

  constructor(private router: Router,
    private bulkScaningPaymentService: BulkScaningPaymentService,
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
       this.isRecordExist =  unassignedPayments['unassigned_payments'].length == 0;
      },
      (error: any) => this.errorMessage = error
    );
  }
  formatUnassignedRecordId(ID: Number){
    return `unassignrecord-${ID}`;
  }
  unProcessedPayment(payment: IBSPayments) {
    debugger
     this.paymentLibComponent.unProcessedPayment = payment;
  }
  redirectToFeeSearchPage(event: any) {
    event.preventDefault();
    this.router.navigateByUrl(`/fee-search?ccdCaseNumber=${this.ccdCaseNumber}&dcn=${this.recordId}`);
  }
  loadUnsolicitedPage(viewName: string) {
    this.paymentLibComponent.bspaymentdcn = `DCN-${this.ccdCaseNumber}`;
    this.paymentLibComponent.viewName = viewName;
  }
  goToAllocatePage() {
    this.paymentLibComponent.viewName = 'allocate-payments';
  }
}
