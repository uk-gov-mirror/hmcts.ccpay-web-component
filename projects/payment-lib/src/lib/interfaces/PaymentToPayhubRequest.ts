import { IFee } from './IFee';

export class PaymentToPayhubRequest {
  currency = 'GBP';
  description = 'PayBubble payment';
  channel = 'telephony';
  provider = 'pci pal';

  ccd_case_number: string;
  amount: number;

  constructor(ccd_case_number: string, amount: number) {
  this.ccd_case_number = ccd_case_number;
  this.amount = <any>amount.toFixed(2);
  }
}
