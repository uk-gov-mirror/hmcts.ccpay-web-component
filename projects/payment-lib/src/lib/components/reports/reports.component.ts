import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {PaymentLibComponent} from '../../payment-lib.component';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import {CaseTransactionsService} from '../../services/case-transactions/case-transactions.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
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
    private bulkScaningPaymentService: BulkScaningPaymentService,
    private paymentViewService: PaymentViewService) { }
   

  ngOnInit() {
    this.fromValidation();
   }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
 }

 getSelectedFromDate(): void {
 this.validateDates();
 }

 validateDates(){
  const selectedStartDate = this.tranformDate(this.reportsForm.get('startDate').value);
  const selectedEndDate = this.tranformDate(this.reportsForm.get('endDate').value);
  if(selectedStartDate > selectedEndDate && selectedEndDate !== ''){
    this.reportsForm.get('startDate').setValue('');
  }

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
  const dataLossRptDefault = [{loss_resp:'',payment_asset_dcn:'',resp_service_id:'',resp_service_name:'',date_banked:'',bgc_batch:'',payment_method:'',amount:''}];
  const unProcessedRptDefault = [{resp_service_id:'',resp_service_name:'',exception_ref:'',ccd_ref:'',date_banked:'',bgc_batch:'',payment_asset_dcn:'',payment_method:'',amount:''}];
  const processedUnallocated =[{resp_service_id:'',resp_service_name:'',allocation_status:'',receiving_office:'',allocation_reason:'',ccd_exception_ref:'',ccd_case_ref:'',payment_asset_dcn:'',date_banked:'',bgc_batch:'',payment_method:'',amount:'',updated_by:''}];
  const shortFallsRptDefault = [{resp_service_id:'',resp_service_name:'',surplus_shortfall:'',balance:'',payment_amount:'',ccd_case_reference:'',processed_date:''}];

  const selectedReportName = this.reportsForm.get('selectedreport').value;
  const selectedStartDate = this.tranformDate(this.reportsForm.get('startDate').value);
  const selectedEndDate = this.tranformDate(this.reportsForm.get('endDate').value);

  if(selectedReportName === 'PROCESSED_UNALLOCATED' || selectedReportName === 'SURPLUS_AND_SHORTFALL' ){
    this.paymentViewService.downloadSelectedReport(selectedReportName,selectedStartDate,selectedEndDate).subscribe(
      response =>  {
        if(response['data'].length === 0 && selectedReportName === 'PROCESSED_UNALLOCATED' ){
          response.data= processedUnallocated;
        } else if(response['data'].length === 0 && selectedReportName === 'SURPLUS_AND_SHORTFALL' ) {
          response.data= shortFallsRptDefault;
        }  
        this.xlFileService.exportAsExcelFile(response['data'], this.reportsForm.get('selectedreport').value+'_'+selectedStartDate+'_To_'+selectedEndDate);
      },
      (error: any) => {
        this.errorMessage = <any>error;
      })
  } else {
    this.bulkScaningPaymentService.downloadSelectedReport(selectedReportName,selectedStartDate,selectedEndDate).subscribe(
      response =>  {
        if(response['data'].length === 0 && selectedReportName === 'DATA_LOSS' ){
           response.data= dataLossRptDefault;
        } else if(response['data'].length === 0 && selectedReportName === 'UNPROCESSED'){
          response.data = unProcessedRptDefault;
        }
        this.xlFileService.exportAsExcelFile(response['data'], this.reportsForm.get('selectedreport').value+'_'+selectedStartDate+'_To_'+selectedEndDate);
      },
      (error: any) => {
        this.errorMessage = <any>error;
      })
  }
   
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
