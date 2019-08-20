
export class AllocatePaymentRequest {
  amount: Number;
  banked_date: String;
  ccd_case_number: String;
  currency: String;
  document_control_number: String;
  external_provider: String;
  giro_slip_no: String;
  payer_name: String;
  payment_channel: Object;
  payment_method: String;
  requestor: String;
  site_id: String;
  constructor(ccd_case_number : string) {
    this.amount = 12;
    this.banked_date = '';
    this.ccd_case_number = ccd_case_number;
    this.currency= "GBP";
    this.document_control_number = '11111111111111111';
    this.external_provider = 'external_provider';
    this.giro_slip_no = 'giro_slip_no' ;
    this.payer_name = 'test';
    this.payment_channel = {
      description: '',
      name: 'PO'
  };
    this.payment_method = 'ONLINE';
    this.requestor= 'requestor';
    this.site_id= 'AA07';
  }
}
