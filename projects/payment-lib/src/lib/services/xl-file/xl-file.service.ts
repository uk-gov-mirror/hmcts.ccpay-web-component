import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class XlFileService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    let worksheet: XLSX.WorkSheet; 
    let workbook: XLSX.WorkBook; 

    if(excelFileName.match('DATA_LOSS')!== null){
     worksheet =  XLSX.utils.json_to_sheet(json,{header:['loss_resp','payment_asset_dcn','resp_service_id','resp_service_name','date_banked','bgc_batch','payment_method','amount']});
     worksheet =  this.setDataLossReportHeaders(worksheet);
     worksheet = this.autoFitColumns(worksheet,json);
     } else if(excelFileName.match('UNPROCESSED')!== null){
     worksheet =  XLSX.utils.json_to_sheet(json,{header:['resp_service_id','resp_service_name','exception_ref','ccd_ref','date_banked','bgc_batch','payment_asset_dcn','payment_method','amount']});
     worksheet =  this.setUnprocessedReportHeaders(worksheet);
     worksheet = this.autoFitColumns(worksheet,json);
    } else if(excelFileName.match('PROCESSED_UNALLOCATED')!== null){
      worksheet =  XLSX.utils.json_to_sheet(json,{header:['resp_service_id','resp_service_name','allocation_status','receiving_office','allocation_reason','ccd_exception_reference','ccd_case_reference','payment_asset_dcn','date_banked','bgc_batch','payment_method','amount']});
      worksheet =  this.setProcessedUnallocatedReportHeaders(worksheet);
      worksheet = this.autoFitColumns(worksheet,json);
    } else {
      worksheet =  XLSX.utils.json_to_sheet(json,{header:['resp_service_id','resp_service_name','surplus_shortfall','balance','payment_amount','ccd_case_reference','processed_date']});
      worksheet =  this.setShortFallReportHeaders(worksheet);
      worksheet = this.autoFitColumns(worksheet,json);
    }
    workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


private autoFitColumns (worksheet: XLSX.WorkSheet,json:any) : XLSX.WorkSheet {
  let objectMaxLength = []; 
  let ColWidth = [];
  let obj = <any>Object;
    for (let i = 0; i < json.length; i++) {
      let value = obj.values(json[i]);
      let key = obj.keys(json[i]);
      for (let j = 0; j < value.length; j++) {
        if(value[j] === null){
          value[j] = '';
        }
        objectMaxLength[j] =
          key[j].length >= value[j].length
            ? key[j].length+2
            : value[j].length+1;
            if( value[j].length === undefined){
              objectMaxLength[j] =  key[j].length+2;
            }
      ColWidth.push({'width': +objectMaxLength[j]});
      }
    }
    worksheet['!cols'] = ColWidth;
    return worksheet;
}


private setDataLossReportHeaders (worksheet: XLSX.WorkSheet): XLSX.WorkSheet {
  worksheet.A1.v = "Loss_Resp";
  worksheet.B1.v = "Payment_Asset_DCN";
  worksheet.C1.v = "Resp_Service ID";
  worksheet.D1.v = "Resp_Service Name";
  worksheet.E1.v = "Date_Banked";
  worksheet.F1.v = "BGC_Batch";
  worksheet.G1.v = "Payment_Method";
  worksheet.H1.v = "Amount";
  return worksheet;
}

private setUnprocessedReportHeaders (worksheet: XLSX.WorkSheet): XLSX.WorkSheet {
  worksheet.A1.v = "Resp_Service ID";
  worksheet.B1.v = "Resp_Service Name";
  worksheet.C1.v = "Exception_Ref";
  worksheet.D1.v = "CCD_Ref";
  worksheet.E1.v = "Date_Banked";
  worksheet.F1.v = "BGC_Batch";
  worksheet.G1.v = "Payment_Asset_DCN";
  worksheet.H1.v = "Payment_Method";
  worksheet.I1.v = "Amount";
  return worksheet;
}

private setProcessedUnallocatedReportHeaders (worksheet: XLSX.WorkSheet): XLSX.WorkSheet {
  worksheet.A1.v = "Resp_Service ID";
  worksheet.B1.v = "Resp_Service Name";
  worksheet.C1.v = "Allocation_Status";
  worksheet.D1.v = "Receiving_Office";
  worksheet.E1.v = "Allocation_Reason";
  worksheet.F1.v = "CCD_Exception_Ref";
  worksheet.G1.v = "CCD_Case_Ref";
  worksheet.H1.v = "Payment_Asset_DCN";
  worksheet.I1.v = "Date_Banked";
  worksheet.J1.v = "BGC_Batch";
  worksheet.K1.v = "Payment_Method";
  worksheet.L1.v = "Amount";
  return worksheet;
}

private setShortFallReportHeaders (worksheet: XLSX.WorkSheet): XLSX.WorkSheet {
  worksheet.A1.v = "Resp_Service ID";
  worksheet.B1.v = "Resp_Service Name";
  worksheet.C1.v = "Surplus_Shortfall";
  worksheet.D1.v = "Balance";
  worksheet.E1.v = "Payment_Amount";
  worksheet.F1.v = "CCD_Case_Ref";
  worksheet.G1.v = "Processed_Date";
  return worksheet;
}

private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
