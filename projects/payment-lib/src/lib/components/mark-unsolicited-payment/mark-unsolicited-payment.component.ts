import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { IBSPayments } from '../../interfaces/IBSPayments';
import { UnsolicitedPaymentsRequest } from '../../interfaces/UnsolicitedPaymentsRequest';

@Component({
  selector: 'app-mark-unsolicited-payment',
  templateUrl: './mark-unsolicited-payment.component.html',
  styleUrls: ['./mark-unsolicited-payment.component.scss']
})
export class MarkUnsolicitedPaymentComponent implements OnInit {
  markPaymentUnsolicitedForm: FormGroup;
  viewStatus: string;
  reasonHasError: boolean = false;
  responsibleOfficeHasError: boolean = false;
  responsiblePersonHasError: boolean = false;
  errorMessage: string;
  emailIdHasError: boolean = false;
  ccdCaseNumber: string;
  bspaymentdcn: string;
  unassignedRecord: IBSPayments;

  constructor(private formBuilder: FormBuilder,
  private paymentLibComponent: PaymentLibComponent,
  private bulkScaningPaymentService: BulkScaningPaymentService) { }

  ngOnInit() {
    this.resetForm();
    this.viewStatus = 'mainForm';
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.bspaymentdcn = this.paymentLibComponent.bspaymentdcn;
    this.getUnassignedPayment();

    const emailPattern = '^[a-z0-9](\\.?[a-z0-9_-]){0,}@[a-z0-9-]+\\.([a-z]{1,6}\\.)?[a-z]{2,6}$';
    
    this.markPaymentUnsolicitedForm = this.formBuilder.group({
      reason: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9\\s]*)$')
      ])),
      responsibleOffice: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9\\s\\n,\\.-:]*)$')
      ])),
      responsiblePerson: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(emailPattern)
      ])),
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(emailPattern)
      ]))
    });
  }
  confirmPayments() {
    const controls = this.markPaymentUnsolicitedForm.controls;
    const requestBody = new UnsolicitedPaymentsRequest
    (this.ccdCaseNumber, this.bspaymentdcn, controls.reason.value, controls.responsibleOffice.value, controls.responsiblePerson.value, controls.emailId.value);
    this.bulkScaningPaymentService.postBSUnsolicitedPayments(requestBody).subscribe(
      response => {
        if (response.success) {
          this.paymentLibComponent.viewName = 'case-transactions';
          this.paymentLibComponent.TAKEPAYMENT = true;
        }
      },
      (error: any) => this.errorMessage = error
    );
  }
 saveAndContinue() {
    this.resetForm();
    if (this.markPaymentUnsolicitedForm.dirty && this.markPaymentUnsolicitedForm.valid) {
      this.viewStatus = 'unsolicitedContinueConfirm';
    }else {
      if(this.markPaymentUnsolicitedForm.controls.reason.invalid ) {
        this.reasonHasError = true;
      }
      if(this.markPaymentUnsolicitedForm.controls.responsibleOffice.invalid) {
        this.responsibleOfficeHasError = true;
      }
      if(this.markPaymentUnsolicitedForm.controls.responsiblePerson.invalid) {
        this.responsiblePersonHasError = true;
      }
      if(this.markPaymentUnsolicitedForm.controls.emailId.invalid) {
        this.emailIdHasError = true;
      }
    }
  }
  resetForm() {

    this.reasonHasError = false;
    this.responsibleOfficeHasError = false;
    this.responsiblePersonHasError = false;
    this.emailIdHasError = false;
  }

cancelMarkUnsolicitedPayments(type?:string){
    if(type && type === 'cancel') {
      if(this.checkingFormValue()){
        this.viewStatus = 'unsolicitedCancelConfirm';
      } else {
        this.gotoCasetransationPage();
      }
    } else {
      this.viewStatus = 'mainForm';
    }
  }
  checkingFormValue(){
    const formFields = this.markPaymentUnsolicitedForm.value;
    let valueExists = false;

    for (var field in formFields) {
      if (formFields.hasOwnProperty(field) && formFields[field] !=="") {
        valueExists = true;
        break;
      }
    }
    return valueExists;
  }
  gotoCasetransationPage() {
    this.paymentLibComponent.viewName = 'case-transactions';
    this.paymentLibComponent.TAKEPAYMENT = true;
  }
   getUnassignedPayment() {
     debugger
    this.bulkScaningPaymentService.getBSPayments(this.bspaymentdcn).subscribe(
      unassignedPayments => {
        debugger
       this.unassignedRecord = unassignedPayments;
      },
      (error: any) => this.errorMessage = error
    );
  }

}
