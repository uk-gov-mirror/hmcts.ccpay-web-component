import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'ccpay-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reportsForm: FormGroup;
  startDate: string;
  endDate: string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fromValidation();
  }

  fromValidation() {
    this.reportsForm = this.formBuilder.group({
      selectedreport: new FormControl('',) });
}

onSelectionChange(value: string) {
  
}


  DownloadReport(){
    alert('Ready for Download!!');
  }
}
