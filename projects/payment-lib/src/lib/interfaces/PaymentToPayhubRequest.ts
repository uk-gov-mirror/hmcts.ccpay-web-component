import { IFee } from './IFee';

export class PaymentToPayhubRequest {
  currency = 'GBP';
  site_id: string;
  description = 'PayBubble payment';
  channel = 'telephony';
  provider = 'pci pal';
  service: string;
  caseType: string;

  ccd_case_number: string;
  amount: number;

  constructor(ccd_case_number: string, amount: number, caseType: string) {
  this.ccd_case_number = ccd_case_number;
  this.amount = <any>amount.toFixed(2);
  this.caseType= caseType;
  }
}
