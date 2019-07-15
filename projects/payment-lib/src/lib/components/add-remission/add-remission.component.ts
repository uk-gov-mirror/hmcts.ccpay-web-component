import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFee } from '../../interfaces/IFee';
import { AddRemissionRequest } from '../../interfaces/AddRemissionRequest';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';

@Component({
  selector: 'ccpay-add-remission',
  templateUrl: './add-remission.component.html',
  styleUrls: ['./add-remission.component.scss']
})
export class AddRemissionComponent implements OnInit {
  @Input() fee: IFee;
  @Input() ccdCaseNumber: string;
  @Input() paymentGroupRef: string;
  @Output() cancelRemission: EventEmitter<void> = new EventEmitter();

  remissionForm: FormGroup;
  hasErrors = false;
  viewStatus = 'main';
  errorMessage = null;

  constructor(private formBuilder: FormBuilder,
    private paymentViewService: PaymentViewService,
    private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.remissionForm = this.formBuilder.group({
      remissionCode: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.viewStatus = 'main';
  }

  addRemission() {
    this.viewStatus = 'confirmation';
  }

  confirmRemission() {
    this.fee.net_amount = this.remissionForm.controls.amount.value;
    const remissionAmount = this.fee.calculated_amount - this.fee.net_amount;
    const requestBody = new AddRemissionRequest
    (this.ccdCaseNumber, this.fee, remissionAmount, this.remissionForm.controls.remissionCode.value);
    this.paymentViewService.postPaymentGroupWithRemissions(this.paymentGroupRef, this.fee.id, requestBody).subscribe(
      response => {
        if (response.success) {
          this.paymentLibComponent.viewName = 'case-transactions';
        }
      },
      (error: any) => this.errorMessage = error
    );

  }
}
