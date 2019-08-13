
export class UnidentifiedPaymentsRequest {
  dcn: string;
  ccd_case_number: string;
  investigation_message: any;

  constructor(dcn: string, ccd_case_number : string, investigation_message: any) {
    this.dcn = dcn;
    this.ccd_case_number = ccd_case_number ;
    this.investigation_message= investigation_message;
  }
}
