import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { IBSPayments } from '../../interfaces/IBSPayments';
import { UnsolicitedPaymentsRequest } from '../../interfaces/UnsolicitedPaymentsRequest';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';
import { stringLiteral } from 'babel-types';

@Component({
  selector: 'app-mark-unsolicited-payment',
  templateUrl: './mark-unsolicited-payment.component.html',
  styleUrls: ['./mark-unsolicited-payment.component.scss']
})
export class MarkUnsolicitedPaymentComponent implements OnInit {
  markPaymentUnsolicitedForm: FormGroup;
  viewStatus: string;
  reasonHasError: boolean = false;
  isReasonEmpty: boolean = false;
  reasonMinHasError: boolean = false;
  reasonMaxHasError: boolean = false;
  responsibleOfficeHasError: boolean = false;
  isResponsibleOfficeEmpty: boolean = false;
  errorMessage: string;
  ccdCaseNumber: string;
  bspaymentdcn: string;
  unassignedRecord: IBSPayments;
  siteID: string = null;
  reason: string;
  responsiblePerson: string;
  responsibleOffice: string;
  emailId: string;
  isConfirmButtondisabled:Boolean = false;

  constructor(private formBuilder: FormBuilder,
  private paymentViewService: PaymentViewService,
  private paymentLibComponent: PaymentLibComponent,
  private bulkScaningPaymentService: BulkScaningPaymentService) { }

  ngOnInit() {
    this.resetForm([false,false,false,false,false,false], 'all');
    this.viewStatus = 'mainForm';
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.bspaymentdcn = this.paymentLibComponent.bspaymentdcn;
    this.getUnassignedPayment();

    const emailPattern = '^[a-z0-9](\\.?[a-z0-9_-]){0,}@[a-z0-9-]+\\.([a-z]{1,6}\\.)?[a-z]{2,6}$';
    
    this.markPaymentUnsolicitedForm = this.formBuilder.group({
      reason: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^([a-zA-Z0-9\\s,\\.]*)$')
      ])),
      responsibleOffice: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9\\s\\n,\\.-:]*)$')
      ])),
      responsiblePerson: new FormControl(''),
      emailId: new FormControl('')
    });
  }
  trimUnderscore(method: string){
    return this.bulkScaningPaymentService.removeUnwantedString(method,' ');
  }
  confirmPayments() {
    this.isConfirmButtondisabled = true;
    const controls = this.markPaymentUnsolicitedForm.controls;
    this.bulkScaningPaymentService.patchBSChangeStatus(this.unassignedRecord.dcn_reference, 'PROCESSED').subscribe(
      res1 => {
        const response1 = JSON.parse(res1),
         requestBody = new AllocatePaymentRequest
        (this.ccdCaseNumber, this.unassignedRecord, this.siteID);
        this.paymentViewService.postBSPayments(requestBody).subscribe(
          res2 => {
            const response2 = JSON.parse(res2),
            reqBody = new UnsolicitedPaymentsRequest
            (response2['data'].payment_group_reference, response2['data'].reference, controls.reason.value, controls.responsibleOffice.value, controls.responsiblePerson.value, controls.emailId.value);
             if (response2.success) {
              this.paymentViewService.postBSUnsolicitedPayments(reqBody).subscribe(
                res3 => {
                  const response3 = JSON.parse(res3);
                  if (response3.success) {
                    this.paymentLibComponent.viewName = 'case-transactions';
                    this.paymentLibComponent.TAKEPAYMENT = true;
                  }
                },
                (error: any) => {
                  this.bulkScaningPaymentService.patchBSChangeStatus(this.unassignedRecord.dcn_reference, 'COMPLETE').subscribe(
                    success => {
                      if (JSON.parse(success).success) {
                        this.paymentLibComponent.viewName = 'case-transactions';
                        this.paymentLibComponent.TAKEPAYMENT = true;
                      }
                    }
                  );
                  this.errorMessage = error;
                  this.isConfirmButtondisabled = false;
                }
              );
            }
          },
          (error: any) => {
            this.bulkScaningPaymentService.patchBSChangeStatus(this.unassignedRecord.dcn_reference, 'COMPLETE').subscribe(
              success => {
                if (JSON.parse(success).success) {
                  this.paymentLibComponent.viewName = 'case-transactions';
                  this.paymentLibComponent.TAKEPAYMENT = true;
                }
              }
            );
            this.errorMessage = error;
            this.isConfirmButtondisabled = false;
          }
        );
      },
      (error: any) => {
        this.errorMessage = error;
        this.isConfirmButtondisabled = false;
      }
    );
  }
 saveAndContinue() {
    this.resetForm([false,false,false,false,false,false], 'all');
        const formerror = this.markPaymentUnsolicitedForm.controls.reason.errors;
        const reasonField = this.markPaymentUnsolicitedForm.controls.reason;
        const officeIdField = this.markPaymentUnsolicitedForm.controls.responsibleOffice;
    if (this.markPaymentUnsolicitedForm.dirty && this.markPaymentUnsolicitedForm.valid) {
      const controls = this.markPaymentUnsolicitedForm.controls;
      this.emailId = controls.emailId.value;
      this.responsibleOffice = controls.responsibleOffice.value;
      this.responsiblePerson = controls.responsiblePerson.value;
      this.reason = controls.reason.value;
      this.viewStatus = 'unsolicitedContinueConfirm';
    }else {
      if( reasonField.value == '' ) {
        this.resetForm([true,false,false,false,false,false], 'reason');
      }
      if(reasonField.value != '' && this.markPaymentUnsolicitedForm.controls.reason.invalid ) {
        this.resetForm([false,true,false,false,false,false], 'reason');
      }
      if(formerror && formerror.minlength && formerror.minlength.actualLength < 3 ) {
        this.resetForm([false,false,true,false,false,false], 'reason');
      }
      if(formerror && formerror.maxlength && formerror.maxlength.actualLength > 255 ) {
        this.resetForm([false,false,false,true,false,false], 'reason');
      }
      if(officeIdField.value == '') {
        this.resetForm([false,false,false,false,true,false], 'responsibleOffice');
      }
      if(officeIdField.value != '' && officeIdField.invalid) {
        this.resetForm([false,false,false,false,false,true],'responsibleOffice');
      }
    }
  }
  resetForm(val, field) {
    if(field==='reason' || field==='all') {
      this.isReasonEmpty = val[0];
      this.reasonHasError = val[1];
      this.reasonMinHasError = val[2];
      this.reasonMaxHasError = val[3];
    }
    if(field==='responsibleOffice' || field==='all') {
      this.isResponsibleOfficeEmpty = val[4];
      this.responsibleOfficeHasError = val[5];
    }
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
    this.bulkScaningPaymentService.getBSPaymentsByDCN(this.bspaymentdcn).subscribe(
      unassignedPayments => {
        
      this.unassignedRecord = unassignedPayments['data'].payments.filter(payment => {
        return payment && payment.dcn_reference == this.bspaymentdcn;
      })[0];
       this.siteID = unassignedPayments['data'].responsible_service_id;
      },
      (error: any) => this.errorMessage = error
    );
  }

}
