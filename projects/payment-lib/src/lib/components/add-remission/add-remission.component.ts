import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IFee } from '../../interfaces/IFee';
import {Router} from '@angular/router';
import { AddRemissionRequest } from '../../interfaces/AddRemissionRequest';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';

const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';

@Component({
  selector: 'ccpay-add-remission',
  templateUrl: './add-remission.component.html',
  styleUrls: ['./add-remission.component.scss']
})
export class AddRemissionComponent implements OnInit {
  @Input() fee: IFee;
  @Input() ccdCaseNumber: string;
  @Input() service: string;
  @Input() paymentGroupRef: string;
  @Output() cancelRemission: EventEmitter<void> = new EventEmitter();

  remissionForm: FormGroup;
  hasErrors = false;
  viewStatus = 'main';
  errorMessage = null;
  option: string = null;
  isConfirmationBtnDisabled: boolean = false;

  isRemissionCodeEmpty: boolean = false;
  remissionCodeHasError: boolean = false;
  isAmountEmpty: boolean = false;
  amountHasError: boolean = false;

  isRemissionReasonEmpty: boolean = false;
  remissionReasonHasError: boolean = false;
  remissionReasonMinHasError: boolean = false;
  remissionReasonMaxHasError: boolean = false;
  isRemissionLessThanFeeError: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private paymentViewService: PaymentViewService,
    private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.option = this.paymentLibComponent.SELECTED_OPTION;
    this.remissionForm = this.formBuilder.group({
      remissionCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9]{3})-([a-zA-Z0-9]{3})-([a-zA-Z0-9]{3})$')
      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]{2})?$')
      ])),
      remissionReason: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^([a-zA-Z0-9\\s,\\.]*)$')
      ]))
    });
    this.viewStatus = 'main';
  }

  addRemission() {
    this.resetRemissionForm([false, false, false, false, false, false, false, false, false], 'All');
    const remissionctrls=this.remissionForm.controls,
      formerror = this.remissionForm.controls.remissionReason.errors,
      reasonField = this.remissionForm.controls.remissionReason,
      isRemissionLessThanFee = this.fee.calculated_amount > remissionctrls.amount.value; 
    if (this.remissionForm.dirty && this.remissionForm.valid && isRemissionLessThanFee) {
      this.viewStatus = 'confirmation';
    }else {

      if(remissionctrls['remissionCode'].value == '' ) {
        this.resetRemissionForm([true, false, false, false, false, false, false, false, false], 'remissionCode');
      }
      if(remissionctrls['remissionCode'].value != '' && remissionctrls['remissionCode'].invalid ) {
        this.resetRemissionForm([false, true, false, false, false, false, false, false, false], 'remissionCode');
      }
      if(remissionctrls['amount'].value == '' ) {
        this.resetRemissionForm([false, false, true, false, false,false, false, false, false], 'amount');
      }
      if(remissionctrls['amount'].value != '' && remissionctrls['amount'].invalid ) {
        this.resetRemissionForm([false, true, false, true, false, false, false, false, false], 'amount');
      }
      if(remissionctrls.amount.valid && !isRemissionLessThanFee){
        this.resetRemissionForm([false, false, false, false, true, false, false, false, false], 'amount');
      }
      if( reasonField.value == '' ) {
        this.resetRemissionForm([false, false, false, false, false, true, false, false, false], 'reason');
      }
      if(reasonField.value != '' && reasonField.invalid ) {
        this.resetRemissionForm([false, false, false, false, false, false, true, false, false], 'reason');
      }
      if(formerror && formerror.minlength && formerror.minlength.actualLength < 3 ) {
        this.resetRemissionForm([false, false, false, false, false, false, false, true, false], 'reason');
      }
      if(formerror && formerror.maxlength && formerror.maxlength.actualLength > 255 ) {
        this.resetRemissionForm([false, false, false, false, false, false, false, false, true], 'reason');
      }
    }
  }

  resetRemissionForm(val, field){
    if(field==='remissionCode' || field==='All') {
      this.isRemissionCodeEmpty = val[0];
      this.remissionCodeHasError = val[1];
    } else if (field==='amount' || field==='All'){
      this.isAmountEmpty = val[2];
      this.amountHasError = val[3];
      this.isRemissionLessThanFeeError = val[4];
    } else if (field==='reason' || field==='All'){
      this.isRemissionReasonEmpty = val[5];
      this.remissionReasonHasError = val[6];
      this.remissionReasonMinHasError = val[7];
      this.remissionReasonMaxHasError = val[8];
    }
  }

  confirmRemission() {
    this.isConfirmationBtnDisabled = true;
    const newNetAmount = this.remissionForm.controls.amount.value,
     reason = this.remissionForm.controls.remissionReason.value,
     remissionAmount = this.fee.net_amount - newNetAmount,
     requestBody = new AddRemissionRequest
    (this.ccdCaseNumber, this.fee, remissionAmount, this.remissionForm.controls.remissionCode.value, reason, this.service);
    this.paymentViewService.postPaymentGroupWithRemissions(this.paymentGroupRef, this.fee.id, requestBody).subscribe(
      response => {
        if (JSON.parse(response).success) {
          if (this.paymentLibComponent.bspaymentdcn) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigateByUrl(`/payment-history/${this.ccdCaseNumber}?view=fee-summary&selectedOption=${this.option}&paymentGroupRef=${this.paymentGroupRef}&dcn=${this.paymentLibComponent.bspaymentdcn}`);
          }else {
            this.gotoCasetransationPage();
          }

        }
      },
      (error: any) => {
        this.errorMessage = error;
        this.isConfirmationBtnDisabled = false;
      }
    );
  }
  gotoCasetransationPage() {
    this.paymentLibComponent.viewName = 'case-transactions';
    this.paymentLibComponent.TAKEPAYMENT = true;
    this.paymentViewService.getBSfeature().subscribe(
      features => {
        let result = JSON.parse(features).filter(feature => feature.uid === BS_ENABLE_FLAG);
        this.paymentLibComponent.ISBSENABLE = result[0] ? result[0].enable : false;
      },
      err => {
        this.paymentLibComponent.ISBSENABLE = false;
      }
    );
  }
}
