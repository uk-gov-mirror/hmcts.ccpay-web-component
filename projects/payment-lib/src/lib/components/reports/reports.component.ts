import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {PaymentLibComponent} from '../../payment-lib.component';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import {CaseTransactionsService} from '../../services/case-transactions/case-transactions.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import {XlFileService} from '../../services/xl-file/xl-file.service';
import {DataLossReport} from '../../interfaces/DataLossReport';

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
  dataLossList: DataLossReport = new DataLossReport();

  constructor(
    private caseTransactionsService: CaseTransactionsService,
    private xlFileService: XlFileService,
    private paymentLibComponent: PaymentLibComponent,
    private formBuilder: FormBuilder,
    private bulkScaningPaymentService: BulkScaningPaymentService,
    private paymentViewService: PaymentViewService) { }

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

  if(selectedReportName === 'PROCESSED_UNALLOCATED'){
    this.paymentViewService.downloadSelectedReport(selectedReportName,selectedStartDate,selectedEndDate).subscribe(
      response =>  {
        this.xlFileService.exportAsExcelFile(response['data'], this.reportsForm.get('selectedreport').value+'_'+selectedStartDate+'_'+selectedEndDate);
      },
      (error: any) => {
        this.errorMessage = <any>error;
      })
  } else {
    this.bulkScaningPaymentService.downloadSelectedReport(selectedReportName,selectedStartDate,selectedEndDate).subscribe(
      response =>  {
        if(response['data'].length === 0){
            let data = JSON.stringify(this.dataLossList);
            response.data= JSON.parse(data);
        }
        this.xlFileService.exportAsExcelFile(response['data'], this.reportsForm.get('selectedreport').value+'_'+selectedStartDate+'_'+selectedEndDate);
      },
      (error: any) => {
        this.errorMessage = <any>error;
      })
  }
   
  }
  // downloadXL(){
    
  //   this.caseTransactionsService.getPaymentGroups('2222333344445555').subscribe(
  //     paymentGroups => {
  //       this.xlFileService.exportAsExcelFile(paymentGroups['payment_groups'][0]['payments'],'report');
  //     },
  //     (error: any) => {
  //       this.errorMessage = <any>error;
  //     }
  //   );
  // }

   tranformDate(strDate: string) {
    let result = '';
    if (strDate) {
      let parts = strDate.split('-');
      result = `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
    return result;
}
  
}
