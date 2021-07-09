export class PaymentToPayhubRequest {
  currency = 'GBP';
  description = 'PayBubble payment';
  channel = 'telephony';
  provider = 'pci pal';
  case_type: string;

  ccd_case_number: string;
  amount: number;

  constructor(ccd_case_number: string, amount: number, caseType: string) {
  this.ccd_case_number = ccd_case_number;
  this.amount = <any>amount.toFixed(2);
  this.case_type= caseType;
  }
}
