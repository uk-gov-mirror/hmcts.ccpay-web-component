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
  unProcessedPaymentList = {
    "unassigned_payments": [
        {
            "id": 10,
            "dcn": "11111111111111111",
            "ccd_ref": "1111-2222-3333-4444",
            "amount": 120,
            "currency": "GBP",
            "banked_date": "2018-07-09T00:16:29.057+0000",
            "giro_slip_no": "4411102159",
            "payment_method": "PO",
            "payment_channel": "Bulk scanning"
        },
        {
            "id": 11,
            "dcn": "22222222222222222",
            "ccd_ref": "1111-2222-3333-4444",
            "amount": 121,
            "currency": "GBP",
            "banked_date": "2018-07-10T00:16:29.057+0000",
            "giro_slip_no": "4111102159",
            "payment_method": "PO",
            "payment_channel": "Bulk scanning"
        },
        {
            "id": 12,
            "dcn": "33333333333333333",
            "ccd_ref": "1111-2222-3333-4444",
            "amount": 124,
            "currency": "GBP",
            "banked_date": "2018-07-12T00:16:29.057+0000",
            "giro_slip_no": "2281102159",
           "payment_method": "PO",
           "payment_channel": "Bulk scanning"
        }
    ]
};

  constructor(private router: Router,
    private bulkScaningPaymentService: BulkScaningPaymentService,
    private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    //Todo ...
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;

    //this.getUnassignedPaymentlist();
    this.unassignedRecordList = <IBSPayments>this.unProcessedPaymentList['unassigned_payments'];
    this.isRecordExist =  this.unProcessedPaymentList['unassigned_payments'].length == 0;


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
