import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { IFee } from 'payment-lib/lib/interfaces/IFee';

@Component({
  selector: 'ccpay-add-remission',
  templateUrl: './add-remission.component.html',
  styleUrls: ['./add-remission.component.scss']
})
export class AddRemissionComponent implements OnInit {
  @Input() fee: IFee;
  remissionForm: FormGroup;
  hasErrors = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.remissionForm = this.formBuilder.group({
      remissionCode: [''],
      amount: [''],
    });
  }

  addRemission() {
    console.log('add remission');
  //  this.remissionCode = this.remissionForm.get('remissionCode').value;
 //   this.router.navigateByUrl(`/payment-lib-int/${this.ccdCaseNumber}?view=case-transactions`);
  }
}
