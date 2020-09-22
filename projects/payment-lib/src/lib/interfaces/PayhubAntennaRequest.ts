export class PayhubAntennaRequest {
  currency = 'GBP';
  site_id: string;
  description = 'PayBubble payment';
  service: string;
  ccd_case_number: string;
  amount: number;

  constructor(ccd_case_number: string, amount: number, service: string, serviceName: string) {
  this.ccd_case_number = ccd_case_number;
  this.amount = <any>amount.toFixed(2);
  this.service= serviceName;
  this.site_id = service;
  }
}
