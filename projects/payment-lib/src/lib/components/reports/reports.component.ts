import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { formatDate } from "@angular/common";
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
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
    private xlFileService: XlFileService,
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
  const selectedStartDate = this.tranformDate(this.reportsForm.get('startDate').value),
    selectedEndDate = this.tranformDate(this.reportsForm.get('endDate').value);
  if(selectedStartDate > selectedEndDate && selectedEndDate !== ''){
    this.reportsForm.get('startDate').setValue('');
  }

 }

  fromValidation() {
    this.reportsForm = this.formBuilder.group({
      selectedreport: new FormControl('') ,
      startDate: new FormControl(''),
      endDate: new FormControl('') 
    });
}

downloadReport(){
  const dataLossRptDefault = [{loss_resp:'',payment_asset_dcn:'',resp_service_id:'',resp_service_name:'',date_banked:'',bgc_batch:'',payment_method:'',amount:''}],
    unProcessedRptDefault = [{resp_service_id:'',resp_service_name:'',exception_ref:'',ccd_ref:'',date_banked:'',bgc_batch:'',payment_asset_dcn:'',payment_method:'',amount:''}],
    processedUnallocated =[{resp_service_id:'',resp_service_name:'',allocation_status:'',receiving_office:'',allocation_reason:'',ccd_exception_ref:'',ccd_case_ref:'',payment_asset_dcn:'',date_banked:'',bgc_batch:'',payment_method:'',amount:'',updated_by:''}],
    shortFallsRptDefault = [{resp_service_id:'',resp_service_name:'',surplus_shortfall:'',balance:'',payment_amount:'',ccd_case_reference:'',ccd_exception_reference:'',processed_date:'', reason:'', explanation:'', user_name:''}],
    selectedReportName = this.reportsForm.get('selectedreport').value,
    selectedStartDate = this.tranformDate(this.reportsForm.get('startDate').value),
    selectedEndDate = this.tranformDate(this.reportsForm.get('endDate').value);

    if(selectedReportName === 'PROCESSED_UNALLOCATED' || selectedReportName === 'SURPLUS_AND_SHORTFALL' ){
      this.paymentViewService.downloadSelectedReport(selectedReportName,selectedStartDate,selectedEndDate).subscribe(
        response =>  {
          let res= {data: this.applyDateFormat(JSON.parse(response))};
          if(res['data'].length === 0 && selectedReportName === 'PROCESSED_UNALLOCATED' ){
            res.data= processedUnallocated;
          } else if(res['data'].length === 0 && selectedReportName === 'SURPLUS_AND_SHORTFALL' ) {
            res.data= shortFallsRptDefault;
          }  
          this.xlFileService.exportAsExcelFile(res['data'], this.getFileName(this.reportsForm.get('selectedreport').value, selectedStartDate, selectedEndDate));
        },
        (error: any) => {
          this.errorMessage = <any>error;
        })
    } else {
      this.bulkScaningPaymentService.downloadSelectedReport(selectedReportName,selectedStartDate,selectedEndDate).subscribe(
        response =>  {
          let res = {data: this.applyDateFormat(JSON.parse(response))};
          if(res['data'].length === 0 && selectedReportName === 'DATA_LOSS' ){
            res.data= dataLossRptDefault;
          } else if(res['data'].length === 0 && selectedReportName === 'UNPROCESSED'){
            res.data = unProcessedRptDefault;
          }
          this.xlFileService.exportAsExcelFile(res['data'], this.getFileName(this.reportsForm.get('selectedreport').value, selectedStartDate, selectedEndDate ));
        },
        (error: any) => {
          this.errorMessage = <any>error;
        })
    }
  }
  getFileName(selectedOption: string, startDate: string, endDate: string ) {
    const loc = 'en-US',
      stDt = formatDate(startDate, 'ddMMyy', loc),
      enDt = formatDate(endDate, 'ddMMyy', loc),
      now = new Date(),
      currentDate = formatDate(now, 'ddMMyy', loc),
      timestamp = `${currentDate}_${this.getTwodigit(now.getHours())}${this.getTwodigit(now.getMinutes())}${this.getTwodigit(now.getSeconds())}`,
      selectedOptionTxt = this.getCamelCaseString(selectedOption);
      
      return selectedOptionTxt+'_'+stDt+'_To_'+enDt+'_Run_'+ timestamp;
  } 
  tranformDate(strDate: string) {
    let result = '';
    if (strDate) {
      let parts = strDate.split('-');
      result = `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
    return result;
  }
  getTwodigit(input: number){
    return ("0" + input).slice(-2);
  }
  getCamelCaseString(selectedOption) {
    let result;
    switch(selectedOption) { 
      case 'UNPROCESSED': { 
        result = 'Unprocessed';
        break; 
      } 
      case 'DATA_LOSS': { 
        result = 'Data_Loss';
        break; 
      } 
      case 'PROCESSED_UNALLOCATED': { 
        result = 'Processed_Unallocated';
        break; 
      } 
      case 'SURPLUS_AND_SHORTFALL': { 
        result = 'Surplus_Shortfall';
        break; 
      } 
      default: { 
        result = selectedOption;
        break; 
      } 
   } 
   return result;
  }
  applyDateFormat(res) {
    const fmt = 'dd/MM/yyyy',
    loc = 'en-US';
    return res['data'].map(value => {
      if (value['date_banked']) {
        value['date_banked'] = formatDate(value['date_banked'], fmt, loc);
      }
      if (value['processed_date']) {
        value['processed_date'] = formatDate(value['processed_date'], fmt, loc);
      }
      return value;
    });
  }
}
