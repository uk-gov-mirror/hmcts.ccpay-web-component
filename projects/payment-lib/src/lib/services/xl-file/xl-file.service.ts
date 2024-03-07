import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const SHEET_NAME = 'data';

@Injectable()
export class XlFileService {
  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet(SHEET_NAME);

    if(excelFileName.match('Data_Loss')!== null){
      //worksheet =  XLSX.utils.json_to_sheet(json,{header:['loss_resp','payment_asset_dcn','env_ref','env_item','resp_service_id','resp_service_name','date_banked','bgc_batch','payment_method','amount']});

      worksheet.columns = [
        { header: 'Loss_Resp', key: 'loss_resp', width: 10 },
        { header: 'Payment_Asset_DCN', key: 'payment_asset_dcn', width: 10 },
        { header: 'Envelope_Ref', key: 'env_ref', width: 10 },
        { header: 'Envelope_Item', key: 'env_item', width: 10 },
        { header: 'Resp_Service ID', key: 'resp_service_id', width: 10 },
        { header: 'Resp_Service Name', key: 'resp_service_name', width: 10 },
        { header: 'Date_Banked', key: 'date_banked', width: 10 },
        { header: 'BGC_Batch', key: 'bgc_batch', width: 10 },
        { header: 'Payment_Method', key: 'payment_method', width: 10 },
        { header: 'Amount', key: 'amount', width: 10 }
      ];

      worksheet =  this.setDataLossReportHeaders(worksheet);
      worksheet = this.autoFitColumns(worksheet,json);
      worksheet =  this.addRowData(worksheet,json);
    } else if(excelFileName.match('Unprocessed')!== null){
      //worksheet =  XLSX.utils.json_to_sheet(json,{header:['resp_service_id','resp_service_name','exception_ref','ccd_ref','date_banked','bgc_batch','payment_asset_dcn','env_ref','env_item','payment_method','amount']});
      worksheet =  this.setUnprocessedReportHeaders(worksheet);
      worksheet = this.autoFitColumns(worksheet,json);
    } else if(excelFileName.match('Processed_Unallocated')!== null){
      //worksheet =  XLSX.utils.json_to_sheet(json,{header:['resp_service_id','resp_service_name','allocation_status','receiving_office','allocation_reason','ccd_exception_reference','ccd_case_reference','payment_asset_dcn','env_ref','env_item','date_banked','bgc_batch','payment_method','amount']});
      worksheet =  this.setProcessedUnallocatedReportHeaders(worksheet);
      worksheet = this.autoFitColumns(worksheet,json);
    } else if(excelFileName.match('Payment failure')!== null){
      //worksheet =  XLSX.utils.json_to_sheet(json,{header:['payment_reference','ccd_reference','document_control_number','org_id','service_name','failure_reference','failure_reason','disputed_amount','event_name','event_date','representment_status','representment_date','refund_reference','refund_amount','refund_date']});
      worksheet =  this.setPaymentFailureReportHeaders(worksheet);
      worksheet = this.autoFitColumns(worksheet,json);
    } else {
      //worksheet =  XLSX.utils.json_to_sheet(json,{header:['resp_service_id','resp_service_name','surplus_shortfall','balance','payment_amount','ccd_case_reference', 'ccd_exception_reference', 'processed_date', 'reason', 'explanation', 'user_name']});
      worksheet =  this.setShortFallReportHeaders(worksheet);
      worksheet = this.autoFitColumns(worksheet,json);
    }
    //workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: EXCEL_TYPE });
          FileSaver.saveAs(blob, `${excelFileName + EXCEL_EXTENSION}`);
    });

    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //this.saveAsExcelFile(excelBuffer, excelFileName);
  }


private autoFitColumns (worksheet: ExcelJS.Worksheet,json:any) : ExcelJS.Worksheet {
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
    //worksheet['!cols'] = ColWidth;
    worksheet.columns = ColWidth;
    return worksheet;
}

private addRowData (worksheet: ExcelJS.Worksheet,json:any) : ExcelJS.Worksheet {
  let objectMaxLength = [];
  let ColWidth = [];
  let obj = <any>Object;
    for (let i = 0; i < json.length; i++) {
      let rowData = obj.values(json[i]);
      worksheet.addRow(rowData);
    }
    return worksheet;
}

private setDataLossReportHeaders (worksheet: ExcelJS.Worksheet): ExcelJS.Worksheet {
  worksheet.getCell('A1').value = "Loss_Resp";
  worksheet.getCell('B1').value = "Payment_Asset_DCN";
  worksheet.getCell('C1').value = "Envelope_Ref";
  worksheet.getCell('D1').value = "Envelope_Item";
  worksheet.getCell('E1').value = "Resp_Service ID";
  worksheet.getCell('F1').value = "Resp_Service Name";
  worksheet.getCell('G1').value = "Date_Banked";
  worksheet.getCell('H1').value = "BGC_Batch";
  worksheet.getCell('I1').value = "Payment_Method";
  worksheet.getCell('J1').value = "Amount";
  return worksheet;
}

private setUnprocessedReportHeaders (worksheet: ExcelJS.Worksheet): ExcelJS.Worksheet {
  worksheet.getCell('A1').value = "Resp_Service ID";
  worksheet.getCell('B1').value = "Resp_Service Name";
  worksheet.getCell('C1').value = "Exception_Ref";
  worksheet.getCell('D1').value = "CCD_Ref";
  worksheet.getCell('E1').value = "Date_Banked";
  worksheet.getCell('F1').value = "BGC_Batch";
  worksheet.getCell('G1').value = "Payment_Asset_DCN";
  worksheet.getCell('H1').value = "Envelope_Ref";
  worksheet.getCell('I1').value = "Envelope_Item";
  worksheet.getCell('J1').value = "Payment_Method";
  worksheet.getCell('K1').value = "Amount";
  return worksheet;
}

private setProcessedUnallocatedReportHeaders (worksheet: ExcelJS.Worksheet): ExcelJS.Worksheet {
  worksheet.getCell('A1').value = "Resp_Service ID";
  worksheet.getCell('B1').value = "Resp_Service Name";
  worksheet.getCell('C1').value = "Allocation_Status";
  worksheet.getCell('D1').value = "Receiving_Office";
  worksheet.getCell('E1').value = "Allocation_Reason";
  worksheet.getCell('F1').value = "CCD_Exception_Ref";
  worksheet.getCell('G1').value = "CCD_Case_Ref";
  worksheet.getCell('H1').value = "Payment_Asset_DCN";
  worksheet.getCell('I1').value = "Envelope_Ref";
  worksheet.getCell('J1').value = "Envelope_Item";
  worksheet.getCell('K1').value = "Date_Banked";
  worksheet.getCell('L1').value = "BGC_Batch";
  worksheet.getCell('M1').value = "Payment_Method";
  worksheet.getCell('N1').value = "Amount";
  return worksheet;
}

private setPaymentFailureReportHeaders (worksheet: ExcelJS.Worksheet): ExcelJS.Worksheet {
  worksheet.getCell('A1').value = "Payment reference";
  worksheet.getCell('B1').value = "CCD reference";
  worksheet.getCell('C1').value = "Document Control Number";
  worksheet.getCell('D1').value = "OrgID";
  worksheet.getCell('E1').value = "Service name";
  worksheet.getCell('F1').value = "Failure reference";
  worksheet.getCell('G1').value = "Failure reason";
  worksheet.getCell('H1').value = "Disputed amount";
  worksheet.getCell('I1').value = "Event name";
  worksheet.getCell('J1').value = "Event date";
  worksheet.getCell('K1').value = "Representment status";
  worksheet.getCell('L1').value = "Representment date";
  worksheet.getCell('M1').value = "Refund reference";
  worksheet.getCell('N1').value = "Refund amount";
  worksheet.getCell('O1').value = "Refund date";
  return worksheet;
}
private setShortFallReportHeaders (worksheet: ExcelJS.Worksheet): ExcelJS.Worksheet {
  worksheet.getCell('A1').value = "Resp_Service ID";
  worksheet.getCell('B1').value = "Resp_Service Name";
  worksheet.getCell('C1').value = "Over Payment_Under Payment";
  worksheet.getCell('D1').value = "Balance";
  worksheet.getCell('E1').value = "Payment_Amount";
  worksheet.getCell('F1').value = "CCD_Case_Ref";
  worksheet.getCell('G1').value = "Exception_Ref";
  worksheet.getCell('H1').value = "Processed_Date";
  worksheet.getCell('I1').value = "Reason";
  worksheet.getCell('J1').value = "Explanation";
  worksheet.getCell('K1').value = "Updated Name";
  return worksheet;
}

private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
