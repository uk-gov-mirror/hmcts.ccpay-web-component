
export class UnsolicitedPaymentsRequest {
  dcn: string;
  ccd_case_number: string;
  reason: string;
  responsible_office:string;
  responsible_person:string;
  email_id: string;
  phone_number: string;
  cost_centre: string;
  constructor(dcn: string, ccd_case_number : string, reason: string,responsible_office: string, responsible_person:string,email_id: string,phone_number: string,cost_centre: string) {
    this.dcn = dcn;
    this.ccd_case_number = ccd_case_number ;
    this.reason = reason;
    this.responsible_office = responsible_office;
    this.responsible_person = responsible_person;
    this.email_id = email_id;
    this.ccd_case_number = ccd_case_number ;
  }
}
