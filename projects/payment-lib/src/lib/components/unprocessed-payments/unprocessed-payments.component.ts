import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IBSPayments } from '../../interfaces/IBSPayments';
import {Router} from '@angular/router';

@Component({
  selector: 'ccpay-app-unprocessed-payments',
  templateUrl: './unprocessed-payments.component.html',
  styleUrls: ['./unprocessed-payments.component.scss']
})
export class UnprocessedPaymentsComponent implements OnInit {

  @Input('PAYMENT_RECORDS_EXISTS') PAYMENT_RECORDS_EXISTS: boolean;
  @Output() selectedUnprocessedFeeEvent: EventEmitter<string> = new EventEmitter();
  viewStatus = 'main';
  unassignedRecordList: IBSPayments;
  errorMessage: string;
  ccdCaseNumber: string;
  recordId: string = null;
  isRecordExist: boolean = false;
  dcnNumber: string = null;
  selectedOption: string;
  isUnprocessedRecordSelected: boolean = false;
  isAllocateToExistingFeebtnEnabled: boolean = false;
  isMarkAsUnidentifiedbtnEnabled: boolean = false;
  isAllocatedToNewFeebtnEnabled: boolean = false;
  isExceptionCase: boolean = false;

  constructor(private router: Router,
    private bulkScaningPaymentService: BulkScaningPaymentService,
    private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    // Todo ...
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.selectedOption = this.paymentLibComponent.SELECTED_OPTION.toLocaleLowerCase();
    this.dcnNumber = this.paymentLibComponent.DCN_NUMBER;
    this.getUnassignedPaymentlist();
     }

  getUnassignedPaymentlist() {
     if (this.selectedOption === 'dcn') {
        this.bulkScaningPaymentService.getBSPaymentsByDCN(this.dcnNumber).subscribe(
        unassignedPayments => {
        this.unassignedRecordList = unassignedPayments['data'].payments;
        if (unassignedPayments['data']['ccd_reference'] === undefined) {
          this.isExceptionCase = true;
        }
        this.isRecordExist =  this.unassignedRecordList.length === 0;
        },
        (error: any) => this.errorMessage = error
      );
    } else {
        this.bulkScaningPaymentService.getBSPaymentsByCCD(this.ccdCaseNumber).subscribe(
        unassignedPayments => {
        this.unassignedRecordList = unassignedPayments['data'].payments;
        if (unassignedPayments['data']['ccd_reference'] === undefined) {
          this.isExceptionCase = true;
        }
        this.isRecordExist =  this.unassignedRecordList.length === 0;
        },
        (error: any) => this.errorMessage = error
      );
    }

  }
  formatUnassignedRecordId(ID: Number) {
    return `unassignrecord-${ID}`;
  }
  redirectToFeeSearchPage(event: any) {
    event.preventDefault();
    this.router.navigateByUrl(`/fee-search?selectedOption=${this.selectedOption}&ccdCaseNumber=${this.ccdCaseNumber}&dcn=${this.recordId}`);
  }
  loadUnsolicitedPage(viewName: string) {
    this.paymentLibComponent.bspaymentdcn = this.recordId;
    this.paymentLibComponent.viewName = viewName;
  }
  unprocessedPaymentSelectEvent(selectedRecordReference: any) {
   this.isUnprocessedRecordSelected = true;
   this.validateButtons();
   this.selectedUnprocessedFeeEvent.emit(selectedRecordReference);
  }
  goToAllocatePage() {
    this.paymentLibComponent.bspaymentdcn = this.recordId;
    this.paymentLibComponent.viewName = 'allocate-payments';
  }

  validateButtons() {
  if ( this.isUnprocessedRecordSelected  && this.isExceptionCase && !this.PAYMENT_RECORDS_EXISTS) {
        this.isMarkAsUnidentifiedbtnEnabled = true;
    } else if ( this.isUnprocessedRecordSelected ) {
      this.isAllocateToExistingFeebtnEnabled = true;
      this.isAllocatedToNewFeebtnEnabled = true;
    }

  }

}
