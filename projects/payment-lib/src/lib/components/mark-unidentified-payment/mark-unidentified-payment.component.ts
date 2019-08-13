import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';

@Component({
  selector: 'app-mark-unidentified-payment',
  templateUrl: './mark-unidentified-payment.component.html',
  styleUrls: ['./mark-unidentified-payment.component.scss']
})
export class MarkUnidentifiedPaymentComponent implements OnInit {
  markPaymentUnidentifiedForm: FormGroup;
  viewStatus: string;
  ccdCaseNumber: string;
  investicationDetailHasError: boolean = false;

  constructor(private formBuilder: FormBuilder,
  private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.viewStatus = 'mainForm';
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.markPaymentUnidentifiedForm = this.formBuilder.group({
      investicationDetail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9\\s]*)$')
      ]))
    });
  }

 saveAndContinue() {
    this.investicationDetailHasError = false;
    if (this.markPaymentUnidentifiedForm.dirty && this.markPaymentUnidentifiedForm.valid) {
      this.viewStatus = 'unidentifiedContinueConfirm';
    }else {
      if(this.markPaymentUnidentifiedForm.controls.investicationDetail.invalid ) {
        this.investicationDetailHasError = true;
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
