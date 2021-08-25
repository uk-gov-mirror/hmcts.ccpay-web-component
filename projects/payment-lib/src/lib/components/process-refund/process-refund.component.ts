import {Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {RefundsService} from '../../services/refunds/refunds.service';
import {PaymentLibComponent} from '../../payment-lib.component';
import { IRefundAction } from '../../interfaces/IRefundAction';
import { IRefundRejectReason } from '../../interfaces/IRefundRejectReason';

@Component({
  selector: 'ccpay-process-refund',
  templateUrl: './process-refund.component.html',
  styleUrls: ['./process-refund.component.css']
})
export class ProcessRefundComponent implements OnInit {
  @Input() refundReference: string;
  @Input() refundlistsource: any[];

  processRefundForm: FormGroup;

  errorMessage: string;
  sendmeback: string = null;
  viewStatus: string;
  refundActionList: IRefundAction[] = []; 
  refundRejectReasonList: IRefundRejectReason[] = []; 
  isSendMeBackClicked: boolean = false;
  isRejectClicked: boolean = false;
  isOtherClicked: boolean = false;
  isSuccesspageEnable: boolean = false;

  refundActionsHasError: boolean = false;
  refundRejectReasonHasError: boolean = false;
  isReasonFieldEmpty: boolean = false;
  isReasonFieldInvalid: boolean = false;
  reasonFieldMinHasError: boolean = false;
  reasonFieldMaxHasError: boolean = false;
  isReasonEmpty: boolean = false;
  isReasonInvalid: boolean = false;

  isConfirmButtondisabled: boolean = true;
  constructor(private RefundsService: RefundsService,
              private formBuilder: FormBuilder,
              private paymentLibComponent: PaymentLibComponent) {
  }

  ngOnInit() {
    this.viewStatus = 'RefundProcess';
    this.RefundsService.getRefundActions(this.refundReference).subscribe(
      refundActionList => {
        this.refundActionList = <any>refundActionList.data;
      },
      err => {
        this.errorMessage = err;
      }
    );
    this.processRefundForm = this.formBuilder.group({
      refundActionField: new FormControl('', Validators.compose([
        Validators.required
      ])),
      refundRejectReasonField: new FormControl('', Validators.compose([
        Validators.required
      ])),
      sendMeBackField: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^([a-zA-Z0-9\\s,\\.]*)$'),

      ])),
      enterReasonField: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9\\s]*)$'),
      ])),
    });
   
  }
  checkRefundActions(code: string) {

    if(code === 'Return to caseworker') {
      this.isConfirmButtondisabled = true;
      this.isSendMeBackClicked = true;
    } else if(code === 'Approve') {
      this.isSendMeBackClicked = false;
      this.isConfirmButtondisabled = false;
    } else if(code === 'Reject') {
      this.isRejectClicked = true;
      this.isSendMeBackClicked = false;
      this.RefundsService.getRefundRejectReasons().subscribe(
        refundRejectReasonList => {
          this.refundRejectReasonList = <any>refundRejectReasonList.data;
        },
        err => {
          this.errorMessage = err;
        }
      );
    } else if (code === 'RE005') {
      this.isOtherClicked = true;
    }
  }
  processRefundSubmit() {
    let processRefundRequest;
    let status;
    this.resetForm([false, false, false, false, false, false, false, false], 'all');
    const controls = this.processRefundForm.controls;
    const processFormError = controls.sendMeBackField.errors;

    if (this.processRefundForm.dirty && controls.refundActionField.valid 
      && (controls.refundActionField.value == 'Approve'
      || (controls.refundActionField.value == 'Reject' && controls.refundRejectReasonField.valid && controls.refundRejectReasonField.value != 'RE005')
      || (controls.refundActionField.value == 'Reject' && controls.refundRejectReasonField.value == 'RE005' && controls.enterReasonField.valid)
      || (controls.refundActionField.value == 'Return to caseworker' && controls.sendMeBackField.valid))) {
      if (controls.refundActionField.value === 'Approve'){
        status = 'APPROVE';
        processRefundRequest = {
          code:'',
          reason: ''
        };
      } else if (controls.refundActionField.value === 'Reject') {
        status = 'REJECT';

        processRefundRequest = {
          code: controls.refundRejectReasonField.value ? controls.refundRejectReasonField.value : '',
          reason: controls.refundRejectReasonField.value == 'RE005' ? controls.enterReasonField.value : ''
        };
      } else if (controls.refundActionField.value === 'Return to caseworker') {
        status = 'SENDBACK';

        processRefundRequest = {
          code: '',
          reason: controls.sendMeBackField.value
        };
      }
      this.RefundsService.patchRefundActions(processRefundRequest, this.refundReference, status).subscribe(
        response => {
          this.isSuccesspageEnable = true;
        },
        err => {
          this.errorMessage = err;
        }
      );
    } else {
      if(controls.refundActionField.value == "") {
        this.resetForm([true, false, false, false, false, false, false, false], 'action');
      }
      if(controls.refundActionField.value == 'Reject' && controls.refundRejectReasonField.value == "") {
        this.resetForm([false, true, false, false, false, false, false, false], 'rejectReason');
      }
      if(controls.refundActionField.value == 'Return to caseworker') {
        if(controls.sendMeBackField.value == '' ) {
          this.resetForm([false, false, true, false, false, false, false, false], 'addAreason');
        }
        if(controls.sendMeBackField.value != '' && controls.sendMeBackField.invalid ) {
          this.resetForm([false, false, false, true, false, false, false, false], 'addAreason');
        }
        if(processFormError && processFormError.minlength && processFormError.minlength.actualLength < 3 ) {
          this.resetForm([false, false, false, false, true, false, false, false], 'addAreason');
        }
        if(processFormError && processFormError.maxlength && processFormError.maxlength.actualLength > 255 ) {
          this.resetForm([false, false, false, false, false, true, false, false], 'addAreason');
        }
      }
      if(controls.refundActionField.value == 'Reject' && controls.refundRejectReasonField.value == 'RE005') {
        if(controls.enterReasonField.value === "") {
          this.resetForm([false, false, false, false, false, false, true, false], 'enterReason');
        }
        if(controls.enterReasonField.value!== "" && controls.enterReasonField.invalid) {
          this.resetForm([false, false, false, false, false, false, false, true], 'enterReason');
        }
      }
    }

  }
  resetForm(vals, field) {
    if(field==='action' || field==='all') {
      this.refundActionsHasError = vals[0];
    }
    if(field==='rejectReason' || field==='all') {
      this.refundRejectReasonHasError = vals[1];
    }
    if(field==='addAreason' || field==='all') {
      this.isReasonFieldEmpty = vals[2];
      this.isReasonFieldInvalid = vals[3];
      this.reasonFieldMinHasError = vals[4];
      this.reasonFieldMaxHasError = vals[5];
    }
    if(field==='enterReason' || field==='all') {
      this.isReasonEmpty = vals[6];
      this.isReasonInvalid = vals[7];
    }
  }
}
