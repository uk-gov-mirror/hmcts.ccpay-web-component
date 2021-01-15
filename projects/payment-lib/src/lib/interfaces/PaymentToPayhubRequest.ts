import { IFee } from './IFee';

export class PaymentToPayhubRequest {
  currency = 'GBP';
  description = 'PayBubble payment';
  channel = 'telephony';
  provider = 'pci pal';

  ccd_case_number: string;
  case_type: string;
  amount: number;

  constructor(ccd_case_number: string, amount: number, caseType: string) {
  this.ccd_case_number = ccd_case_number;
  this.case_type = caseType;
  this.amount = <any>amount.toFixed(2);
  }
}
