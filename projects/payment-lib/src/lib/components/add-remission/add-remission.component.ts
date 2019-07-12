import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFee } from '../../interfaces/IFee';

@Component({
  selector: 'ccpay-add-remission',
  templateUrl: './add-remission.component.html',
  styleUrls: ['./add-remission.component.scss']
})
export class AddRemissionComponent implements OnInit {
  @Input() fee: IFee;
  @Output() cancelRemission: EventEmitter<void> = new EventEmitter();

  remissionForm: FormGroup;
  hasErrors = false;
  viewStatus = 'main';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.remissionForm = this.formBuilder.group({
      remissionCode: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.viewStatus = 'main';
  }

  addRemission() {
    if (this.remissionForm.valid) {
      console.log('next step go to add remission confirmation page');
      this.viewStatus = 'confirmation';
    }
  }

  confirmRemission() {
    console.log('confirm remission');
  }
}
