import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import {BulkScaningPaymentService} from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { IBSPayments } from '../../interfaces/IBSPayments';

@Component({
  selector: 'app-mark-unidentified-payment',
  templateUrl: './mark-unidentified-payment.component.html',
  styleUrls: ['./mark-unidentified-payment.component.scss']
})
export class MarkUnidentifiedPaymentComponent implements OnInit {
  markPaymentUnidentifiedForm: FormGroup;
  viewStatus: string;
  ccdCaseNumber: string;
  bspaymentdcn: string;
  investicationDetailHasError: boolean = false;
  investicationDetailMinHasError: boolean = false;
  investicationDetailMaxHasError: boolean = false;

  errorMessage: string;
  unassignedRecord:IBSPayments[];

  constructor(private formBuilder: FormBuilder,
  private paymentLibComponent: PaymentLibComponent,
  private bulkScaningPaymentService: BulkScaningPaymentService) { }

  ngOnInit() {
    this.viewStatus = 'mainForm';
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.bspaymentdcn = this.paymentLibComponent.bspaymentdcn;
    this.getUnassignedPayment();

    this.markPaymentUnidentifiedForm = this.formBuilder.group({
      investicationDetail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^([a-zA-Z0-9\\s,\\.]*)$')
      ]))
    });
  }
 getUnassignedPayment() {
    this.bulkScaningPaymentService.getBSPayments(this.bspaymentdcn).subscribe(
      unassignedPayments => {
        this.unassignedRecord = unassignedPayments;
      },
      (error: any) => this.errorMessage = error
    );
  }
 saveAndContinue() {
    this.investicationDetailHasError = false;
    const formerror = this.markPaymentUnidentifiedForm.controls.investicationDetail.errors;
    if (this.markPaymentUnidentifiedForm.dirty && this.markPaymentUnidentifiedForm.valid) {
      this.viewStatus = 'unidentifiedContinueConfirm';
    }else {
      if(this.markPaymentUnidentifiedForm.controls.investicationDetail.invalid ) {
        this.investicationDetailHasError = true;
        this.investicationDetailMinHasError = false;
        this.investicationDetailMaxHasError = false;
      }
      if(formerror.minlength && formerror.minlength.actualLength < 3 ) {
        this.investicationDetailHasError = false;
        this.investicationDetailMinHasError = true;
      }
      if(formerror.maxlength && formerror.maxlength.actualLength > 255 ) {
        this.investicationDetailHasError = false;
        this.investicationDetailMaxHasError = true;
      }
    }
  }
  cancelMarkUnidentifiedPayments(type?:string){
    if(type && type === 'cancel') {
        if(this.markPaymentUnidentifiedForm.get('investicationDetail').value!==""){
          this.viewStatus = 'unidentifiedCancelConfirm';
        } else {
          this.gotoCasetransationPage();
        }
    } else {
      this.viewStatus = 'mainForm';
    }
  }
  gotoCasetransationPage() {
    this.paymentLibComponent.viewName = 'case-transactions';
    this.paymentLibComponent.TAKEPAYMENT = true;
  }
}
