import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {PaymentLibComponent} from '../../payment-lib.component';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import {CaseTransactionsService} from '../../services/case-transactions/case-transactions.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import {XlFileService} from '../../services/xl-file/xl-file.service';


@Component({
  selector: 'ccpay-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reportsForm: FormGroup;
  startDate: string;
  endDate: string;
  ccdCaseNumber: string;
  errorMessage: string;
  paymentGroups: IPaymentGroup[] = [];
  constructor(
    private caseTransactionsService: CaseTransactionsService,
    private xlFileService: XlFileService,
    private paymentLibComponent: PaymentLibComponent,
    private formBuilder: FormBuilder,
    private bulkScaningPaymentService: BulkScaningPaymentService,) { }

  ngOnInit() {
    this.fromValidation();
   }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
 }

 getSelectedFromDate(): void {
  //this.reportsForm.get('startDate').setValue('');
 }

  fromValidation() {
    this.reportsForm = this.formBuilder.group({
      selectedreport: new FormControl('') ,
      startDate: new FormControl(''),
      endDate: new FormControl('') });
      
}

onSelectionChange(value: string) {
  
}

downloadReport(){
  const selectedReportName = this.reportsForm.get('selectedreport').value;
  const selectedStartDate = this.tranformDate(this.reportsForm.get('startDate').value);
  const selectedEndDate = this.tranformDate(this.reportsForm.get('endDate').value);
    this.bulkScaningPaymentService.downloadSelectedReport(selectedReportName,selectedStartDate,selectedEndDate).subscribe((response) => {
    let myBlob = new Blob([response._body], {type: 'application/vnd.ms-excel'});
    let downloadUrl = URL.createObjectURL(myBlob);
    let a = document.createElement('a');
    a.href = downloadUrl;
    a.download = this.reportsForm.get('selectedreport').value+'.xlsx';// you can take a custom name as well as provide by server
    a.click();
    setTimeout( ()=> {
          URL.revokeObjectURL(downloadUrl);
      }, 100);
  }); 
  }
  downloadXL(){
    
    this.caseTransactionsService.getPaymentGroups('1111222233334444').subscribe(
      paymentGroups => {
        this.xlFileService.exportAsExcelFile(paymentGroups['payment_groups'],'report');
      },
      (error: any) => {
        this.errorMessage = <any>error;
      }
    );
  }

   tranformDate(strDate: string) {
    let result = '';
    if (strDate) {
      let parts = strDate.split('-');
      result = `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
    return result;
}
  
}
